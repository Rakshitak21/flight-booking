import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/Flight/flight.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css'],
})
export class FlightBookingComponent implements OnInit {
  tripType: string;

  origin: string;
  destination: string;

  departureDate: string;
  returnDate: string;

  adultCount: number;
  childrenCount: number;

  flightClass: string;

  displayModal = false;

  constructor(
    private router: Router,
    private flightService: FlightService,
    private toastr: ToastrService
  ) {
    this.tripType = '';
    this.origin = '';
    this.destination = '';
    this.departureDate = '';
    this.returnDate = '';
    this.adultCount = 0;
    this.childrenCount = 0;
    this.flightClass = 'Economy Class';  // default
  }

  ngOnInit(): void {}

  // Convert YYYY-MM-DD → DD-MM-YYYY (MATCH DB FORMAT)
  convertToDDMMYYYY(dateStr: string): string {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();

    // Validation
    if (this.origin === this.destination) {
      this.toastr.error('Origin and destination cannot be the same');
      return;
    }

    if (this.returnDate && this.departureDate > this.returnDate) {
      this.toastr.error('Return date must be after departure date');
      return;
    }

    if (this.adultCount === 0 && this.childrenCount === 0) {
      this.toastr.error('At least one passenger is required');
      return;
    }

    // Convert dates to DD-MM-YYYY
    const departureDDMMYYYY = this.convertToDDMMYYYY(this.departureDate);
    const returnDDMMYYYY = this.convertToDDMMYYYY(this.returnDate);

    // BUILD FILTER OBJECT
    const filterObject: any = {
      routeSource: this.origin,
      routeDestination: this.destination,
      departureDate: departureDDMMYYYY
    };

    if (this.flightClass === 'Economy Class') {
      filterObject['isEconomyClass'] = true;
    }

    console.log("FINAL FILTER SENT TO BACKEND:", filterObject);

    this.displayModal = true;

    this.flightService
      .getFlights(filterObject)
      .pipe(finalize(() => (this.displayModal = false)))
      .subscribe(
        (result: any) => {
          console.log("Fetched:", result.data);

          // Backend returns: { isDone, isError, data: [ flights ] }
          if (Array.isArray(result.data) && result.data.length > 0) {
            this.flightService.flights = result.data;
            this.flightService.nextFlights = result.data;

            this.router.navigate(['/flights']);
          } else {
            this.toastr.info("No flights found for this search.");
          }
        },
        (error) => {
          this.toastr.error("Error fetching flights");
          console.log("Error Occurred:", error);
        }
      );
  }
}
