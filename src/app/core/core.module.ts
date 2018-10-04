import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesComponent } from './countries/countries.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { QuizzComponent } from './quizz/quizz.component';
import { CountriesApiService } from './services/countries-api.service';
import { QuizzService } from './services/quizz.service';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CountriesComponent,
        HeaderComponent,
        MapComponent,
        QuizzComponent,
    ],
    exports: [
        CountriesComponent,
        HeaderComponent,
        MapComponent,
        QuizzComponent,
    ],
    providers: [
        CountriesApiService,
        QuizzService,
    ]
})
export class CoreModule { }
