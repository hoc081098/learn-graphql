import { Injectable } from '@angular/core';
import { Event } from './event';
import { of, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const EventsQuery = gql`
  query {
    events {
      _id
      title
      description
      price
      date
      creator {
        _id
        email
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private readonly apollo: Apollo) {}

  getEvents$(): Observable<Event[]> {
    return this.apollo.query<any>({ query: EventsQuery }).pipe(
      map(result => {
        const events: any[] = result.data.events;
        return events.map(event => {
          return { ...event };
        });
      })
    );
  }
}
