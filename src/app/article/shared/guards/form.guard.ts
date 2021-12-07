import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SafeData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<SafeData> {
  canDeactivate(
    component: SafeData
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.isDataSaved()) {
      let confirmResult = confirm(
        `You data will not be saved.Do you want to exit the page?`
      );
      return of(confirmResult);
    }
    return of(true);
  }
}
