import { TestBed, async } from '@angular/core/testing';
import { QuizzService } from './quizz.service';

describe('QuizzService', () => {

  let service: QuizzService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ QuizzService ],
    }).compileComponents();

    service = TestBed.get(QuizzService);
  }));

  it('should render a string "country" on trigger', async(() => {
    let country: string;

    service.triggered$.subscribe(res => {
      country = res;
    });

    service.trigger('France');
    expect(country).toBe('France');
  }));
});

