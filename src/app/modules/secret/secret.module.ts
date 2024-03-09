import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSecretComponent } from './create-secret/create-secret.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CreateSecretComponent],
  exports: [CreateSecretComponent],
})
export class SecretModule {}
