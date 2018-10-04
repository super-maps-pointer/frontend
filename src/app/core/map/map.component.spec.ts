import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizzService } from '../services/quizz.service';

describe('MapCompenent', () => {

  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MapComponent
      ],
      providers: [
        QuizzService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should render a map after generation', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    component.generateNewMap();
    expect(compiled.querySelector('svg')).not.toBe(null);
  }));
});
