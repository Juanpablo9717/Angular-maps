import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams() {
    return new HttpParams().set('fields', 'name,flags,capital,population,maps,cca3');
  }

  constructor( private http: HttpClient) { }

  searchCountry(country: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${country}`;
    return this.http.get<Country[]>(url, { params: this.httpParams});
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${capital}`;
    return this.http.get<Country[]>(url, { params: this.httpParams});
  }

  getCountryByAlpha(code: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url);
  }

  getCountriesByContinent(continent: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${continent}`;
    return this.http.get<Country[]>(url, { params: this.httpParams});
  }
}
