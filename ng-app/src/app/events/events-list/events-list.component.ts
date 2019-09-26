import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventsService } from '../events.service';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Events } from 'src/app/graphql/generated/graphql';
import { EventDetailDialogComponent } from './event-detail-dialog/event-detail-dialog.component';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events$: Observable<[Events.Events, string][]>;
  isLoading = true;

  constructor(
    private readonly authService: AuthService,
    private readonly eventsService: EventsService,
    readonly dialog: MatDialog
  ) {
    this.events$ = combineLatest(
      this.eventsService.getEvents$(),
      this.authService.currentUserId$()
    ).pipe(
      tap(() => this.isLoading = false),
      map(([events, uid]) => {
        return events.map(e => [e, uid]);
      }),
    );
  }

  ngOnInit(): void {}

  handleClickEvent(event: Event) {
    const dialogRef = this.dialog.open(EventDetailDialogComponent, {
      width: '30rem',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
    });
  }
}
