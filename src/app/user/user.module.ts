import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CreateUserComponent, ReactiveFormsModule],
  exports: [CreateUserComponent]
})
export class UserModule {}
