import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../event';

@Component({
  selector: 'app-events-item',
  templateUrl: './events-item.component.html',
  styleUrls: ['./events-item.component.css']
})
export class EventsItemComponent implements OnInit {
  @Input()
  event: [Event, string];

  @Output()
  clickEvent = new EventEmitter<Event>();

  constructor() {}

  ngOnInit() {
    console.log({ event: this.event });
  }
}
