import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecretService } from '../shared/services/secret-service/secret.service';
import { SecretGridResponse } from './models/secret-grid-response';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-secret-management',
    imports: [],
    templateUrl: './secret-management.component.html'
})
export class SecretManagementComponent implements OnInit, OnDestroy {
  response: SecretGridResponse[] = [];

  $destroy = new Subject<void>();

  constructor(
    private readonly secretService: SecretService
  ) {}

  ngOnInit(): void {
    this.getSecrets();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  private getSecrets(): void {
    this.secretService.getSecretsCreatedByUser().pipe(
      takeUntil(this.$destroy),
      tap((response: SecretGridResponse[]) => {
        this.response = response;
        console.log('Secrets fetched successfully:', this.response);
      })
    ).subscribe();
  }
}
