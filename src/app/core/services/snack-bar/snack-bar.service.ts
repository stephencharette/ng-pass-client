import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Open a snackbar with the given message, action, and options
   * @param message the message to display
   * @param action the action to take
   * @param options additional options
   */
  openSnackBar(message: string, action: string, options: any) {
    this._snackBar.open(message, action, options);
  }
}
