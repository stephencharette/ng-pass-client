import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// MaterialUI
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// Child components
import { UserFormComponent } from '../user-form/user-form.component';

import {
  AbstractControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'input-error-state-matcher-example',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    UserFormComponent,
    CommonModule,
  ],
})
export class SignInComponent {
  title: string = 'Sign in'
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit() {
    console.log('Form submitted');
  }
}
