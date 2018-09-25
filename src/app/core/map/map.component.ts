import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ButtonNextService } from '../services/button-next.service';

import * as d3 from 'd3';
import { feature } from 'topojson';
import d3GeoZoom from 'd3-geo-zoom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  width = 500;
  height = 500;
  projection;
  path;
  svg;

  @Output() countryEvent = new EventEmitter<string>();

  constructor(private buttonNextService: ButtonNextService) {
    buttonNextService.triggered$.subscribe(selectedCountry => {
        d3.select('svg').remove();
        this.generateNewMap(selectedCountry);
      },
      console.error
    );
  }

  ngOnInit() {
    this.generateNewMap(null);
  }

  public generateNewMap(selectedCountry): void {
    const mapJson = '../../assets/json/countries.json';

    this.projection = this.getProjection();
    this.path = d3.geoPath(this.projection);
    this.svg = this.getSvg();

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
  private render() {
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
  private getSvg() {
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
  private generateMap(mapType, withGraticule = true) {
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
  private drawCountries(world) {
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

        // Send country to quizz
        this.countryEvent.emit(d.properties.name);

        this.rotateToFocusOn(d);
        this.applyCssOnClick(id, nodes);
      });
  }

  /**
   * Add class 'clicked' zhen clicking a country on the map (to apply css)
   * @param id Integer of the selected country
   * @param nodes Array of Object Country generate by d3.json defined by mapJson
   */
  private applyCssOnClick(id, nodes) {
    d3.selectAll(nodes).classed('clicked', false);
    d3.select(nodes[id]).classed('clicked', true);
  }

  /**
   * Rotate the map to center the country clicked by the user.
   * @param x selected Country Object
   */
  private rotateToFocusOn(x) {
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
