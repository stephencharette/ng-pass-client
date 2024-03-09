import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// MaterialUI
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  AbstractControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() f: { [key: string]: AbstractControl };
  @Input() submit: () => void;
}
