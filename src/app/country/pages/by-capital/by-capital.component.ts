import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})

export class ByCapitalComponent {

  thereIsError: Boolean = false;
  termSearch: string = '';
  countries: Country[] = [];

  constructor( private countryService: CountryService ) {}

  search(termSearch: string) {
    this.termSearch = termSearch;
    this.countryService.searchCapital(this.termSearch)
      .subscribe({
        next: countries => {
          this.thereIsError = false;
          this.countries = countries;
        },
        error: () => {
          this.thereIsError = true;
          this.countries = [];
        }
      })
  }

  suggestions( term: string) {
    this.thereIsError = false;
    // TODO create suggestions

  }

}
