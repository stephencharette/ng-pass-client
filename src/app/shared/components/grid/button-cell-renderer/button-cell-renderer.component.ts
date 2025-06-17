import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ButtonCellRendererParams } from './models/button-cell-renderer-params';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-button-cell-renderer',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './button-cell-renderer.component.html',
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {
    params: ButtonCellRendererParams = {} as ButtonCellRendererParams;
    showMatIcon: boolean = false;
    showLocalIcon: boolean = false;

    agInit(params: ICellRendererParams & ButtonCellRendererParams): void {
        this.params = params as ButtonCellRendererParams;
        this.showMatIcon = this.getShowMatIcon();
        this.showLocalIcon = this.getShowLocalIcon();
    }

    refresh(): boolean {
        return false;
    }

    click(): void {
        this.params.clickFunction(this.params);
    }

    private getShowMatIcon(): boolean {
        return this.params.iconUri === undefined;
    }

    private getShowLocalIcon(): boolean {
        return this.params.iconUri !== undefined;
    }
}
