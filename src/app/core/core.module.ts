import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesComponent } from './countries/countries.component';
import { CountriesApiService } from './services/countries-api.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CountriesComponent
    ],
    exports: [
        CountriesComponent
    ],
    providers: [
        CountriesApiService,
    ]
})
export class CoreModule { }
