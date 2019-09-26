import { Injectable } from '@angular/core';
import { map, tap, shareReplay } from 'rxjs/operators';
import { BookingsGQL, CancelBookingGQL } from '../graphql/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  constructor(
    private readonly bookingsGQL: BookingsGQL,
    private readonly cancelBookingGQL: CancelBookingGQL,
  ) { }

  getAllBookings$() {
    return this.bookingsGQL.watch().valueChanges.pipe(
      map(value => value.data.bookings),
      tap(bookings => console.log('[BOOKINGS$] ', bookings.length))
    );
  }

  cancelBooking(bookingId: string) {
    return this.cancelBookingGQL
      .mutate(
        { bookingId },
        {
          refetchQueries: [
            {
              query: this.bookingsGQL.document,
              variables: {}
            }
          ],
          optimisticResponse: {
            __typename: 'Mutation',
            cancelBooking: {
              __typename: 'Event',
              _id: bookingId,
              title: ''
            }
          }
        }
      );
  }
}
