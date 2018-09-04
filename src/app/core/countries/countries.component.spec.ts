import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CountriesComponent } from './countries.component';
import { CountriesApiService } from '../services/countries-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CountriesComponent', () => {

  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        CountriesComponent
      ],
      providers: [
        CountriesApiService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Countries');
  }));
});
