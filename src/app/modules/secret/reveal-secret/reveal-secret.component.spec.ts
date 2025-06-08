import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealSecretComponent } from './reveal-secret.component';

describe('RevealSecretComponent', () => {
  let component: RevealSecretComponent;
  let fixture: ComponentFixture<RevealSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealSecretComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevealSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
