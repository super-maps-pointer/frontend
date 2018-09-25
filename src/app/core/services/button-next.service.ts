import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ButtonNextService {
  private _trigger = new Subject();
  triggered$ = this._trigger.asObservable();

  trigger(selectedCountry) {
    this._trigger.next(selectedCountry);
  }
}
