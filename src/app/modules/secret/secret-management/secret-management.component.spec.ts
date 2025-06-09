import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretManagementComponent } from './secret-management.component';

describe('SecretManagementComponent', () => {
  let component: SecretManagementComponent;
  let fixture: ComponentFixture<SecretManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
