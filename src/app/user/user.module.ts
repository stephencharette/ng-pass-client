import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignUpComponent, ReactiveFormsModule],
  exports: [SignUpComponent],
})
export class UserModule {}
