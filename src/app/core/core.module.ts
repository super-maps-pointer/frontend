import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CountriesComponent } from './countries/countries.component';
import { MapComponent } from './map/map.component';
import { CountriesApiService } from './services/countries-api.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        CountriesComponent,
        MapComponent
    ],
    exports: [
        CountriesComponent,
        MapComponent
    ],
    providers: [
        CountriesApiService,
    ]
})
export class CoreModule { }
