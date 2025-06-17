import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCellRendererComponent } from './button-cell-renderer.component';
import { nameOfClass } from '../../../../core/functions/string-helpers';

describe(nameOfClass(ButtonCellRendererComponent), () => {
    let component: ButtonCellRendererComponent;
    let fixture: ComponentFixture<ButtonCellRendererComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonCellRendererComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonCellRendererComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
