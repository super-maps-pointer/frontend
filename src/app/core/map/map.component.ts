import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
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
   * Generate the svg object, defined with width and height from this class
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

  private drawCountries(world) {
    const countries = feature(world, world.objects.countries).features;

    this.svg.selectAll('.country')
      .data(countries)
      .enter()
      .append('path')
      .attr('class', 'geo country')
      .on('mouseover', (d, i, nodes) => {
        d3.select(nodes[i]).style('opacity', 1);
      })
      .on('mouseout', function(d, i, nodes) {
        d3.select(nodes[i]).style('opacity', 0.6);
      })
      .on('click', (d, id, nodes) => {
        d3.select('.info').html(d.properties.name + ': ' + d.properties.pop);

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
    for (let i = 0; i < nodes.length; i++) {
      if (i === id) {
        d3.select(nodes[i])
        .attr('class', 'geo country clicked');
      } else {
        d3.select(nodes[i])
          .attr('class', 'geo country');
      }
    }
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
