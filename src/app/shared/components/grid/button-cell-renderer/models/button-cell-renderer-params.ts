import { ICellRendererParams } from 'ag-grid-community';

export interface ButtonCellRendererParams extends ICellRendererParams {
    label: string;
    classList?: string;
    clickFunction: (params: ICellRendererParams | undefined) => void;
    iconClassList?: string;
    iconUri?: string;
    iconAlt?: string;
    iconTitle?: string;
    matIconIdentifier?: string;
}
