import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyToClipboardService {

  constructor() { }

  copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
