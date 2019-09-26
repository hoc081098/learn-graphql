import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bookings } from 'src/app/graphql/generated/graphql';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.css']
})
export class BookingItemComponent implements OnInit {
  @Input()
  booking: Bookings.Bookings;

  @Output()
  clickCancel = new EventEmitter<Bookings.Bookings>();

  constructor() { }

  ngOnInit() {
  }

}
