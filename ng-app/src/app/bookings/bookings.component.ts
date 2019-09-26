import { Component, OnInit } from '@angular/core';
import { Bookings } from '../graphql/generated/graphql';
import { BookingsService } from './bookings.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CancelBookingDialogComponent } from './cancel-booking-dialog/cancel-booking-dialog.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  isLoading = true;
  bookings$: Observable<Bookings.Bookings[]>;

  constructor(
    private readonly bookingsService: BookingsService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log('[BOOKINGS_COMPONENT] onInit');
    this.bookings$ = this.bookingsService.getAllBookings$().pipe(
      tap(() => this.isLoading = false)
    );
  }

  showCancelBookingsDialog(booking: Bookings.Bookings) {
    console.log(booking);
    const dialogRef = this.dialog.open(CancelBookingDialogComponent, {
      width: '30rem',
      data: booking
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
    });
  }
}
