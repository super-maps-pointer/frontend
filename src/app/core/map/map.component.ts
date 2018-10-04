import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizzService } from '../services/quizz.service';

import * as d3 from 'd3';
import { feature } from 'topojson';
import d3GeoZoom from 'd3-geo-zoom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {
  readonly width: number = 500;
  readonly height: number = 500;

  // d3 Object and function needed to generate the map
  projection: any;
  path: any;
  svg: any;

  quizzSub: Subscription;
  countryToGuess: string;
  isClicked: boolean;

  @Output() countryEvent = new EventEmitter<string>();

  constructor(private quizzService: QuizzService) {
    this.quizzSub = this.quizzService.triggered$.subscribe(countryToGuess => {
      this.countryToGuess = countryToGuess;
      d3.select('svg').remove();
      this.generateNewMap();
    },
      console.error
    );
  }

  ngOnDestroy(): void {
    if (this.quizzSub) {
      this.quizzSub.unsubscribe();
    }
  }

  /**
   * Generate all the map in this order:
   *  - create the projection, the svg etc...
   *  - Enable zoom and render
   *  - load the geojson map
   *  - Generate the map without the countries
   *  - Draw countries and bind user interactions
   *  - Render all on screen
   */
  public generateNewMap(): void {
    const mapJson = '../../assets/json/countries.json';

    this.projection = this.getProjection();
    this.path = d3.geoPath(this.projection);
    this.svg = this.getSvg();
    this.isClicked = false;

    // Enable drag and zoom
    d3GeoZoom()
      .projection(this.projection)
      .onMove(() => this.svg.selectAll('path.geo').attr('d', this.path))
      (this.svg.node());

    d3.json(mapJson)
    .then((world) => {
      // Generate the map without the countries
      this.generateMap('Sphere');

      // Draw countries and bind user interaction (as onClick...)
      this.drawCountries(world);

      // Render all this on screen
      this.render();
    });
  }

  /**
   * Render or re-render the map.
   */
  private render(): void {
    this.svg.selectAll('path.geo').attr('d', this.path);
  }

  /**
   * This function is intended to choose the projection of the map, by default
   * it's orthographic but in the future we will need to generate a random projection
   * from https://github.com/d3/d3-geo-projection
   */
  private getProjection() {
    return d3.geoOrthographic()
      .translate([this.width / 2, this.height / 2])
      .scale(250)
      .clipAngle(90)
      .precision(0.1)
      .rotate([0, -30]);
  }

  /**
   * Generate the svg object, defined with width and height
   */
  private getSvg(): Selection {
    return d3.select('.globe')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', '0, 0, ' + this.width + ', ' + this.height);
  }

  /**
   * Generate the map as expected and add graticule (lines around the world) if needed
   * @param mapType String: It will adapt according to the projection
   */
  private generateMap(mapType, withGraticule = true): void {
    this.svg.append('path')
      .attr('class', 'geo background')
      .datum({type: mapType});

    if (withGraticule) {
      const graticule = d3.geoGraticule();

      this.svg.append('path')
        .attr('class', 'geo graticule')
        .datum(graticule);
    }
  }

  /**
   * Display all the country and allow different binding.
   * NOTE: This is one of the core function of this component
   * @param world geojson file containing all the coordinates and the information for the countries
   */
  private drawCountries(world): void {
    const countries = feature(world, world.objects.countries).features;

    this.svg.selectAll('.country')
      .data(countries)
      .enter()
      .append('path')
      .attr('class', 'geo country')
      .on('mouseover', (d, id, nodes) => {
        d3.select(nodes[id]).classed('hover', true);
      })
      .on('mouseout', (d, id, nodes) => {
        d3.select(nodes[id]).classed('hover', false);
      })
      .on('click', (d, id, nodes) => {
        d3.select('.info').html(d.properties.name + ': ' + d.properties.pop);

        if (!this.isClicked) {
          this.applyCssOnClick(id, nodes, 'clicked');

          if (this.countryToGuess) {
            this.HighLighCountyToGuess(nodes);
          }

          // Send country to quizz
          this.countryEvent.emit(d.properties.name);
        }
        this.isClicked = true;
      });
  }

  /**
   * Apply css and rotate to country to guess
   * @param nodes Array of Object Country generate by d3.json defined by mapJson
   */
  private HighLighCountyToGuess(nodes): void {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].__data__.properties.name === this.countryToGuess) {
        this.applyCssOnClick(i, nodes, 'good');
        this.rotateToFocusOn(nodes[i].__data__);
        break;
      }
    }
  }

  /**
   * Add class 'className' when clicking a country on the map (to apply css)
   * @param id Integer of the selected country
   * @param nodes Array of Object Country generate by d3.json defined by mapJson
   * @param className String, name of the class to be apply
   */
  private applyCssOnClick(id, nodes, className: string): void {
    d3.selectAll(nodes).classed(className, false);
    d3.select(nodes[id]).classed(className, true);
  }

  /**
   * Rotate the map to center the country clicked by the user.
   * @param x selected Country Object
   */
  private rotateToFocusOn(x): void {
    let coords;
    coords = d3.geoCentroid(x);
    coords[0] = -coords[0];
    coords[1] = -coords[1];

    d3.transition()
    .duration(1250)
    .tween('rotate', () => {
      let r;
      r = d3.interpolate(this.projection.rotate(), coords);
      return (t) => {
          this.projection.rotate(r(t));
          this.render();
      };
    })
    .transition();
  }
}
