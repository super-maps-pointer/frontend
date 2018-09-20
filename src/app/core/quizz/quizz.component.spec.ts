import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { QuizzComponent } from './quizz.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuizzComponent', () => {

  let component: QuizzComponent;
  let fixture: ComponentFixture<QuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        QuizzComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // TODO
  // it('should render title in a h1 tag', async(() => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Super Maps Pointer');
  // }));
});
