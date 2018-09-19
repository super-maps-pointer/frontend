import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CountriesComponent } from './countries/countries.component';
import { MapComponent } from './map/map.component';
import { CountriesApiService } from './services/countries-api.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        CountriesComponent,
        HeaderComponent,
        MapComponent
    ],
    exports: [
        CountriesComponent,
        HeaderComponent,
        MapComponent
    ],
    providers: [
        CountriesApiService,
    ]
})
export class CoreModule { }
