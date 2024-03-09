import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up/sign-up.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignUpComponent,
    UserFormComponent,
    ReactiveFormsModule,
  ],
  exports: [SignUpComponent],
})
export class UserModule {}
