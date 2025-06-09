import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
    selector: 'app-simple-layout',
    imports: [
        RouterModule,
        NavbarComponent,
        CommonModule,
    ],
    standalone: true,
    templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent {

}
