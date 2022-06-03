import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      button {
        margin-right: 10px;
      }
    `,
  ],
})

export class ByRegionComponent {
  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  activeRegion: string = '';
  countries: Country[] = [];
  thereIsError : boolean = false;

  constructor(private countryService: CountryService) {}

  activateRegion(region: string) {
    this.countries = [];
    this.activeRegion = region;

    this.countryService.getCountriesByContinent(region)
      .subscribe({
        next: (countries) => {
          this.thereIsError = false;
          this.countries = countries;
        },
        error: () => {
          this.thereIsError = true;
          this.countries = [];
        },
    });
  }
}
