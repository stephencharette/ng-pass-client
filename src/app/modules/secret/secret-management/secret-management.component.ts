import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecretService } from '../shared/services/secret-service/secret.service';
import { SecretGridResponse } from './models/secret-grid-response';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { nameOf } from '../../../core/functions/string-helpers';
import { ColDef, GridOptions, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { SecretsSignalRService } from '../shared/services/secrets-signal-r/secrets-signal-r.service';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';

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
            }
        },
        {
            field: nameOf<SecretGridResponse>('ttl'),
            headerName: 'Expiration'
        },
        {
            field: nameOf<SecretGridResponse>('guid'),
            valueFormatter: (params) => {
                const guid = params.value;
                return `localhost:4200/reveal?key=${guid}`; // TODO: replace w environment variable
            }
        }
    ];

    gridOptions: GridOptions = {
        columnDefs: this.colDef,
    };

    gridApi: GridApi;

    constructor(
        private readonly secretService: SecretService,
        private readonly signalRService: SecretsSignalRService,
        private readonly http: HttpClient
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
            await this.signalRService.startConnection(this.apiUrl); // Replace with your API URL
        } catch (error) {
            console.error('Failed to connect to SignalR hub:', error);
            this.errorMessage = 'Failed to connect to real-time updates';
        }
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
