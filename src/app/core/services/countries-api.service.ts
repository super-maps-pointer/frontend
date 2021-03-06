import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Country } from './country.model';
import { throwError } from 'rxjs';

@Injectable()
export class CountriesApiService {

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${environment.apiUrl}/countries`)
      .pipe(
        catchError(CountriesApiService._handleError)
      );
  }
}
