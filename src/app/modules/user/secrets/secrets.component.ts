import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { RetrieveUserSecretsService } from '../../../core/services/retrieve-user-secrets/retrieve-user-secrets.service';

export interface UserSecret {
  key: string;
  baseUri: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { url: 'https://google.com', expires: '2022-12-31' },
//   { url: 'https://twitter.com', expires: '2022-12-31' },
// ];

@Component({
  selector: 'app-secrets',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './secrets.component.html',
  styleUrl: './secrets.component.css',
})
export class SecretsComponent {
  displayedColumns: string[] = ['key', 'baseUri'];
  error: boolean = false;
  dataSource = [] as UserSecret[];

  constructor(private retrieveUserSecretsService: RetrieveUserSecretsService) {}

  public ngOnInit(): void {
    this.retrieveUserSecretsService.retrieveUserSecrets('1').subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = data.secrets;
      },
      error: (e) => {
        this.dataSource = [];
        this.toggleError();
        console.error(e);
      },
    });
  }

  public toggleError() {
    this.error = true;
  }
}
