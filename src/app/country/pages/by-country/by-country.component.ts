import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class ByCountryComponent {
  thereIsError: Boolean = false;
  termSearch: string = '';
  countries: Country[] = [];
  countriesSuggested: Country[] = [];

  constructor(private countryService: CountryService) {}

  search(termSearch: string): void {
    if(this.countriesSuggested.length > 0) {
      this.countriesSuggested = [];
    }
    this.termSearch = termSearch;
    this.countryService.searchCountry(this.termSearch).subscribe({
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

  suggestions(term: string) {
    this.thereIsError = false;
    this.termSearch = term;

    this.countryService.searchCountry(term)
      .subscribe({
        next: countries => {
          this.countriesSuggested = countries.splice(0, 5);
        },
        error: () => {
          this.countriesSuggested = [];
        }
      })

  }
}
