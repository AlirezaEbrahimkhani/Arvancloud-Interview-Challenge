import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private _dialogResult = new Subject<boolean>();
  private _registeredDialog: ConfirmationDialogComponent;

  public get result(): Observable<boolean> {
    return this._dialogResult.asObservable();
  }

  private set _setDialogResult(result: boolean) {
    this._dialogResult.next(result);
  }

  public register(dialog: ConfirmationDialogComponent) {
    this._registeredDialog = dialog;
  }

  public showDialog() {
    this._registeredDialog.show();
    this._registeredDialog.onOk.subscribe(() => {
      this._registeredDialog.hide();
      this._setDialogResult = true;
    });
    this._registeredDialog.onCancel.subscribe(() => {
      this._registeredDialog.hide();
      this._setDialogResult = false;
    });
  }
}
