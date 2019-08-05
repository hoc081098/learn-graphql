import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventsService } from '../events.service';
import { Event } from '../event';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Hi {{ data.title }}</h1>
    <div mat-dialog-content>
      <p>What's your favorite animal?</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>
        Ok
      </button>
    </div>
  `
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events$: Observable<[Event, string][]>;

  constructor(
    private readonly authService: AuthService,
    private readonly eventsService: EventsService,
    readonly dialog: MatDialog
  ) {
    this.events$ = combineLatest(
      this.eventsService.getEvents$(),
      this.authService.currentUserId$()
    ).pipe(
      map(([events, uid]) => {
        return events.map(e => [e, uid]);
      })
    );
  }

  ngOnInit(): void {}

  handleClickEvent(event: Event) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
    });
  }
}
