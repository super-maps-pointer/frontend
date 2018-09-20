import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { feature } from 'topojson';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {
  countryNameList: string[];
  countryToGuess: string;

  selectedCountry: string;

  ngOnInit(): void {
    const mapJson = '../../assets/json/countries.json';

    d3.json(mapJson)
      .then((world) => {
        const topoCountries = feature(world, world.objects.countries).features;
        this.countryNameList = topoCountries.map(c => c.properties.name);

        this.countryToGuess = this.pickRandomCountry();
      });
  }

  /**
   * Event binded to MapComponent.
   * It will the name of the selected (on click) country.
   * Then it will trigger the validation
   * @param $event
   */
  public receiveCountry($event): void {
    this.selectedCountry = $event;
    this.validation();
  }

  private validation(): void {
    if (this.countryToGuess === this.selectedCountry) {
      console.log('you win');
      this.countryToGuess = this.pickRandomCountry();
    } else {
      console.log('you lose');
    }
  }

  private pickRandomCountry(): string {
    return this.countryNameList[Math.floor(Math.random() * this.countryNameList.length)];
  }
}
