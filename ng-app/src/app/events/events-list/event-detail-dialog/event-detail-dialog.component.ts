import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Events } from 'src/app/graphql/generated/graphql';
import { AuthService } from 'src/app/auth/auth.service';
import { EventsService } from '../../events.service';
import { getErrorMessage } from 'src/app/util/message.util';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: ['./event-detail-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Events.Events,
    public authService: AuthService,
    private snackbar: MatSnackBar,
    private eventsService: EventsService,
  ) { }

  submitBooking() {
    this.eventsService
      .bookEvent({ eventId: this.data._id })
      .subscribe(
        _ => {
          this.dialogRef.close();
          this.snackbar.open('Booked event successfully', undefined, { duration: 2000 });
        },
        error => {
          this.dialogRef.close();
          this.snackbar.open(getErrorMessage(error), undefined, { duration: 2000 });
        }
      );
  }
}
