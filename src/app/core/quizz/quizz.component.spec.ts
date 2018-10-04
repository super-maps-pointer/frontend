import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { QuizzComponent } from './quizz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizzService } from '../services/quizz.service';
import { MapComponent } from '../map/map.component';

describe('QuizzComponent', () => {

  let component: QuizzComponent;
  let fixture: ComponentFixture<QuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        QuizzComponent,
        MapComponent,
      ],
      providers: [
        QuizzService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should have score init to zero', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.score').textContent).toContain('Score');
  }));
});
