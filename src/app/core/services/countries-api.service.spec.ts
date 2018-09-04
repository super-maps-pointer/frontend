import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { CountriesApiService } from './countries-api.service';
import { Country } from './country.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CountriesApiService', () => {

  const COUNTRY_OBJECT: Country = new Country('France', 'Paris', 1, new Date(), new Date());

  let service: CountriesApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CountriesApiService ],
    }).compileComponents();

    service = TestBed.get(CountriesApiService);
  }));

  it('should render country object', fakeAsync(() => {
    let countriesList: Country[];

    spyOn(service, 'getCountries').and.returnValue(of([COUNTRY_OBJECT]));

    service.getCountries()
             .subscribe(res => { countriesList = res; });

    tick();
    expect(countriesList).toContain(COUNTRY_OBJECT);
  }));
});

