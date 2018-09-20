import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CountriesComponent } from './countries/countries.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { QuizzComponent } from './quizz/quizz.component';
import { CountriesApiService } from './services/countries-api.service';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        CountriesComponent,
        HeaderComponent,
        MapComponent,
        QuizzComponent
    ],
    exports: [
        CountriesComponent,
        HeaderComponent,
        MapComponent,
        QuizzComponent
    ],
    providers: [
        CountriesApiService,
    ]
})
export class CoreModule { }
