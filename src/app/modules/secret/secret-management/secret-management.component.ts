import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecretService } from '../shared/services/secret-service/secret.service';
import { SecretGridResponse } from './models/secret-grid-response';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { nameOf } from '../../../core/functions/string-helpers';
import { ColDef, GridOptions, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { SecretsSignalRService } from '../shared/services/secrets-signal-r/secrets-signal-r.service';
import * as signalR from '@microsoft/signalr';
import { ButtonCellRendererComponent } from '../../../shared/components/grid/button-cell-renderer/button-cell-renderer.component';
import { ButtonCellRendererParams } from '../../../shared/components/grid/button-cell-renderer/models/button-cell-renderer-params';
import { CopyToClipboardService } from '../../../core/services/copy-to-clipboard/copy-to-clipboard.service';
import { RouteConstants } from '../../../core/constants/routes';
import { SecretUrlService } from '../shared/services/secret-url/secret-url.service';
import { SnackBarService } from '../../../core/services/snack-bar/snack-bar.service';

@Component({
    selector: 'app-secret-management',
    imports: [CommonModule, AgGridAngular],
    templateUrl: './secret-management.component.html'
})
export class SecretManagementComponent implements OnInit, OnDestroy {
    messages$: Observable<{ user: string, message: string }[]>;
    connectionState$: Observable<signalR.HubConnectionState>;
    isConnected = false;
    errorMessage = '';
    secrets: SecretGridResponse[] = [];

    private subscriptions = new Subscription();
    private apiUrl = 'https://localhost:7097'; // Replace with your API URL and move away

    response: SecretGridResponse[] = [];

    $destroy = new Subject<void>();

    colDef: ColDef[] = [
        {
            field: nameOf<SecretGridResponse>('createdAt'),
            headerName: 'Created At',
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            },
            sort: 'desc',
        },
        {
            headerName: 'Expires At',
            valueGetter: (params) => {
                const secret = params.data as SecretGridResponse;
                const createdAt = params.data.createdAt ? new Date(params.data.createdAt) : new Date();
                let expiresAt;

                if (secret.ttl === "day") {
                    expiresAt = createdAt.setDate(createdAt.getDate() + 1);
                }
                else if (secret.ttl === "week") {
                    expiresAt = createdAt.setDate(createdAt.getDate() + 7);
                } else if(secret.ttl === "month") {
                    expiresAt = createdAt.setMonth(createdAt.getMonth() + 1);
                }

                return expiresAt ? new Date(expiresAt).toLocaleString() : 'Never';
            }
        },
        {
            headerName: 'URL',
            maxWidth: 96,
            filter: false,
            sortable: false,
            cellRenderer: ButtonCellRendererComponent,
            pinned: 'right',
            cellRendererParams: {
                classList: '!rounded-full',
                matIconIdentifier: 'content_copy',
                iconClassList: '!m-0',
                clickFunction: (params: ButtonCellRendererParams) =>
                    this.copyUrlToClipboard(params)
            },
        },
    ];

    gridOptions: GridOptions = {
        columnDefs: this.colDef,
    };

    gridApi: GridApi;

    constructor(
        private readonly secretService: SecretService,
        private readonly signalRService: SecretsSignalRService,
        private readonly copyToClipboardService: CopyToClipboardService,
        private readonly secretUrlService: SecretUrlService,
        private readonly snackBarService: SnackBarService
    ) { }

    ngOnInit(): void {
        this.getSecrets();
        this.setupSignalRSubscriptions();
        this.connectToHub();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.signalRService.stopConnection();

        this.$destroy.next();
        this.$destroy.complete();
    }

    refreshSecrets(): void {
        if (this.isConnected) {
            this.signalRService.requestSecretsList();
        } else {
            // Fallback to HTTP call if SignalR is not connected
            this.getSecrets();
        }
    }

    onGridReady(
        params: GridReadyEvent
    ) {
        this.gridApi = params.api;
        this.updateGrid();
    }

    private copyUrlToClipboard(params: ButtonCellRendererParams): void {
        const rowIndex = params.node.rowIndex;
        if(rowIndex === null) {
            return;
        }

        const secret = this.response[rowIndex];

        this.copyToClipboardService.copyToClipboard(
            this.secretUrlService.getFullRevealUrl(secret.guid)
        );

        this.snackBarService.openSnackBar('Secret URL copied to clipboard', 'Close');
    }


    private setupSignalRSubscriptions(): void {
        this.signalRService.connectionState$
            .pipe(takeUntil(this.$destroy),
                tap(state => {
                    this.isConnected = state === signalR.HubConnectionState.Connected;
                    if (this.isConnected) {
                        this.refreshSecrets();
                    }
                })).subscribe();

        this.signalRService.secretCreated$.pipe(
            takeUntil(this.$destroy),
            tap(secretData => {
                this.refreshSecrets();
            })
        ).subscribe();

        this.signalRService.secretDeleted$.pipe(
            takeUntil(this.$destroy),
            tap(secretData => {
                this.refreshSecrets();
            })
        ).subscribe();

        this.signalRService.secretsListReceived$.pipe(
            takeUntil(this.$destroy),
            tap(secrets => {
                this.response = secrets;
                this.updateGrid();
            })
        ).subscribe();
    }

    private async connectToHub(): Promise<void> {
        try {
            await this.signalRService.startConnection(); // Replace with your API URL
        } catch (error) {
            console.error('Failed to connect to SignalR hub:', error);
            this.errorMessage = 'Failed to connect to real-time updates';
        }
    }

    private updateGrid(): void {
        this.gridApi.setGridOption('rowData', this.response);
    }

    private getSecrets(): void {
        this.secretService.getSecretsCreatedByUser().pipe(
            takeUntil(this.$destroy),
            tap((response: SecretGridResponse[]) => {
                this.response = response;
                console.log('Secrets fetched successfully:', this.response);
            })
        ).subscribe();
    }
}
