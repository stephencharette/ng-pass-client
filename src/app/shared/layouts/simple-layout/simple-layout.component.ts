import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-simple-layout',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    CommonModule,
  ],
  templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent {

}
