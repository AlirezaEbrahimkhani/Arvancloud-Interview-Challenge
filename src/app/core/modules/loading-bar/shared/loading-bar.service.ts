import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  public get isLoading(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  public show() {
    this._isLoading$.next(true);
  }

  public hide() {
    this._isLoading$.next(false);
  }
}
