import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CreateEventDialogComponent } from './create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(
    readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {}

  handleCreateEvent() {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '30rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
    });
  }
}
