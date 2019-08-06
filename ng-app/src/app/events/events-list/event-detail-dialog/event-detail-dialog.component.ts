import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Events } from 'src/app/generated/graphql';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: ['./event-detail-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Events.Events
  ) {}
}
