import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  EventsGQL,
  Events,
  CreateEventGQL,
  CreateEvent,
  BookEventGQL,
  BookEvent
} from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(
    private readonly eventsGQL: EventsGQL,
    private readonly createEventGQL: CreateEventGQL,
    private readonly bookEventGQL: BookEventGQL
  ) { }

  getEvents$(): Observable<Events.Events[]> {
    return this.eventsGQL.watch().valueChanges.pipe(
      map(result => result.data.events),
      tap(events => console.log('[EVENTS]', events))
    );
  }

  createEvent(eventInput: CreateEvent.Variables) {
    return this.createEventGQL
      .mutate(eventInput, {
        refetchQueries: [
          {
            query: this.eventsGQL.document,
            variables: {}
          }
        ],
        optimisticResponse: {
          __typename: 'Mutation',
          createEvent: {
            __typename: 'Event',
            _id: '',
            ...eventInput,
            creator: {
              __typename: 'User',
              _id: '',
              email: ''
            }
          }
        }
      })
      .pipe(tap(event => console.log('[CREATE_EVENT]', event)));
  }

  bookEvent(eventInput: BookEvent.Variables) {
    return this.bookEventGQL.mutate(eventInput);
  }
}
