import { RouterLinkWithHref } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService, Flight } from '@flight42/logic-flight';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    NgIf, NgFor, DatePipe,
    RouterLinkWithHref,
    FormsModule
  ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  from = 'Paris';
  to = 'New York';
  urgent = false;
  selectedFlight?: Flight;
  #flightService = inject(FlightService);

  get flights() {
    return this.#flightService.flights;
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.#flightService.load(this.from, this.to, this.urgent);
  }

  select(flight: Flight): void {
    this.selectedFlight = this.selectedFlight === flight ? undefined : flight;
  }

  delay(): void {
    this.#flightService.delay();
  }
}
