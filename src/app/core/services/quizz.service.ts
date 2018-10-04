import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class QuizzService {
  private _trigger = new Subject<string>();
  triggered$ = this._trigger.asObservable();

  trigger(countryToGuess: string): void {
    this._trigger.next(countryToGuess);
  }
}
