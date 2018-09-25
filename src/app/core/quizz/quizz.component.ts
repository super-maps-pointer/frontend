import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { ButtonNextService } from '../services/button-next.service';

import * as d3 from 'd3';
import { feature } from 'topojson';
import { Game } from './game.model';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {
  countryNameList: string[];
  countryToGuess: string;
  goodAnswer: boolean;
  game = new Game(5, 1, 0, true, false);

  selectedCountry: string;

  constructor(private buttonNextService: ButtonNextService) { }

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
    this.gameCycle();
  }

  public nextQuestion(): void {
    this.buttonNextService.trigger(this.selectedCountry);
    this.game.isPaused = false;
  }

  private gameCycle(): void {

    this.goodAnswer = this.countryToGuess === this.selectedCountry;

    if (this.goodAnswer) {
     this.game.score += 1;
    }

    this.countryToGuess = this.pickRandomCountry();
    this.game.currentQuestion += 1;

    // End of game if no more questions otherwise game is paused
    if (this.game.currentQuestion > this.game.totalQuestion) {
      this.game.isRunning = false;
    } else {
      this.game.isPaused = true;
    }
  }

  /**
   * Pick a random country and delete it from the list
   */
  private pickRandomCountry(): string {
    const rdmCountry = this.countryNameList[Math.floor(Math.random() * this.countryNameList.length)];

    const index = this.countryNameList.indexOf(rdmCountry, 0);
    if (index > -1) {
      this.countryNameList.splice(index, 1);
    }

    return rdmCountry;
  }
}
