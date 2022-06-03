import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styles: [`
  .loading-container {
    display: flex;
    justify-content: center;
    height: 50vh;
    width: 100%;
    align-items: center;
  }
  `]
})

export class ShowCountryComponent implements OnInit {

  country!: Country[];

  constructor( 
    private activaredRoute: ActivatedRoute,
    private countryService: CountryService
    ) { }

  ngOnInit(): void {
    this.activaredRoute.params
    .pipe(switchMap( ({id}) => this.countryService.getCountryByAlpha(id) )).subscribe(country => {
        this.country = country
      })

    // this.activaredRoute.params
    //   .subscribe( ({id}) => {
    //     this.countryService.getCountryByAlpha(id).subscribe( country => {
          
    //       console.info(country)
    //     })
    //   })
  }

}
