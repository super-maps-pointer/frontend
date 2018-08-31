import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { Country } from './countries/country.model';
import { CountriesApiService } from './countries/countries-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const COUNTRY_OBJECT: Country = new Country('France', 'Paris', 1, new Date(), new Date());

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        CountriesApiService
      ],
    }).compileComponents();
    spyOn(CountriesApiService.prototype, 'getCountries').and.returnValue(of([COUNTRY_OBJECT]));
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Countries');
  }));
});
