import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Events } from 'src/app/generated/graphql';

@Component({
  selector: 'app-events-item',
  templateUrl: './events-item.component.html',
  styleUrls: ['./events-item.component.css']
})
export class EventsItemComponent implements OnInit {
  @Input()
  event: [Events.Events, string];

  @Output()
  clickEvent = new EventEmitter<Events.Events>();

  constructor() {}

  ngOnInit() {}
}
