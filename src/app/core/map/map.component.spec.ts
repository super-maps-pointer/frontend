import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should render a map', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('svg')).not.toBe(null);
  }));
});
