import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit {

  termSearch: string = '';
  @Input() placeholder: string = '';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  ngOnInit(): void {

    this.debouncer
    .pipe(debounceTime(300))
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
    
  }

  search() {
    this.onEnter.emit(this.termSearch);
    this.debouncer.subscribe()
  }

  keyPressed() {
    this.debouncer.next(this.termSearch);
  }

}
