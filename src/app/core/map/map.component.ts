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

  ngOnInit() {
    const width = 500;
    const height = width;
    const mapJson = '../../assets/json/countries.json';

    let projection;
    let path;
    let svg;
    let graticule;
    let countries;

    projection = d3.geoOrthographic()
      .translate([width / 2, height / 2])
      .scale(250)
      .clipAngle(90)
      .precision(0.1)
      .rotate([0, -30]);

    path = d3.geoPath(projection);

    svg = d3.select('.globe')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0, 0, ' + width + ', ' + height);

    d3GeoZoom()
      .projection(projection)
      .onMove(() => svg.selectAll('path.geo').attr('d', path))
      (svg.node());

    d3.json(mapJson)
    .then((world) => {

      svg.append('path')
        .attr('class', 'geo background')
        .datum({type: 'Sphere'});

      graticule = d3.geoGraticule();

      svg.append('path')
        .attr('class', 'geo graticule')
        .datum(graticule);

      countries = feature(world, world.objects.countries).features;

      svg.selectAll('.country')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'geo country')
        .on('click', (d) => {
          d3.select('.info').html(d.properties.name + ': ' + d.properties.pop);
        });

        svg.selectAll('path.geo').attr('d', path);
    });
  }
}
