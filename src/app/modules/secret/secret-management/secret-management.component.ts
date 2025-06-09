import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecretService } from '../shared/services/secret-service/secret.service';
import { SecretGridResponse } from './models/secret-grid-response';
import { Subject, takeUntil, tap } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { nameOf } from '../../../core/functions/string-helpers';
import { ColDef, GridOptions, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-secret-management',
    imports: [CommonModule, AgGridAngular],
    templateUrl: './secret-management.component.html'
})
export class SecretManagementComponent implements OnInit, OnDestroy {
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
    private readonly secretService: SecretService
  ) {}

  ngOnInit(): void {
    this.getSecrets();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  onGridReady(
      params: GridReadyEvent
  ) {
      this.gridApi = params.api;
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
