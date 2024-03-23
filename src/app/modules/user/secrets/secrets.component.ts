import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  url: string;
  expires: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { url: 'https://google.com', expires: '2022-12-31' },
  { url: 'https://twitter.com', expires: '2022-12-31' },
];

@Component({
  selector: 'app-secrets',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './secrets.component.html',
  styleUrl: './secrets.component.css',
})
export class SecretsComponent {
  displayedColumns: string[] = ['expires', 'url'];
  dataSource = ELEMENT_DATA;
}
