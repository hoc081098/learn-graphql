import { Component, OnInit, Inject } from '@angular/core';
import { Bookings } from 'src/app/graphql/generated/graphql';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { EventsService } from 'src/app/events/events.service';
import { BookingsService } from '../bookings.service';
import { Subject, of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { getErrorMessage } from 'src/app/util/message.util';
import { jSXAttribute } from 'babel-types';

@Component({
  selector: 'app-cancel-booking-dialog',
  templateUrl: './cancel-booking-dialog.component.html',
  styleUrls: ['./cancel-booking-dialog.component.css']
})
export class CancelBookingDialogComponent implements OnInit {
  submitCancelBooking = new Subject<void>();

  constructor(
    public readonly dialogRef: MatDialogRef<CancelBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: Bookings.Bookings,
    private readonly snackbar: MatSnackBar,
    private readonly bookingsService: BookingsService,
  ) { }

  ngOnInit() {
    this
      .submitCancelBooking
      .pipe(
        exhaustMap(() => this.bookingsService.cancelBooking(this.data._id)),
        map(result => {
          return { result: result || {}, error: null };
        }),
        catchError(error => of({ result: null, error }))
      )
      .subscribe(
        result => {
          if (result.result) {
            this.dialogRef.close();
            this.snackbar.open('Canceled bookings successfully', undefined, { duration: 2000 });
          } else {
            this.dialogRef.close();
            this.snackbar.open('Canceled bookings not successfully: ' + getErrorMessage(result.error), undefined, { duration: 2000 });
          }
        }
      );
  }
}
