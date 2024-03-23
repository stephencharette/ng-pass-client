import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  url: string;
  viewed: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { viewed: true, url: 'https://google.com' },
  { viewed: false, url: 'https://twitter.com' }
];

@Component({
  selector: 'app-secrets',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './secrets.component.html',
  styleUrl: './secrets.component.css',
})
export class SecretsComponent {
  displayedColumns: string[] = ['viewed', 'url'];
  dataSource = ELEMENT_DATA;
}
