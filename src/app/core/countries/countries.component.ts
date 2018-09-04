import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountriesApiService } from '../services/countries-api.service';
import { Country } from '../services/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {
  countriesListSubs: Subscription;
  countriesList: Country[];

  constructor(private countriesApi: CountriesApiService) {
  }

  ngOnInit() {
    this.countriesListSubs = this.countriesApi
      .getCountries()
      .subscribe(res => {
          this.countriesList = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    if (this.countriesListSubs) {
      this.countriesListSubs.unsubscribe();
    }
  }
}
