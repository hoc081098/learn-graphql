export type Maybe<T> = T | null;

export interface EventInput {
  title: string;

  description: string;

  price: number;

  date: string;
}

export interface UserInput {
  email: string;

  password: string;
}

// ====================================================
// Documents
// ====================================================

export namespace BookEvent {
  export type Variables = {
    eventId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    bookEvent: BookEvent;
  };

  export type BookEvent = {
    __typename?: "Booking";

    _id: string;

    createdAt: string;

    updatedAt: string;
  };
}

export namespace Bookings {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    bookings: Bookings[];
  };

  export type Bookings = {
    __typename?: "Booking";

    _id: string;

    event: Event;

    createdAt: string;
  };

  export type Event = {
    __typename?: "Event";

    _id: string;

    title: string;

    date: string;
  };
}

export namespace CancelBooking {
  export type Variables = {
    bookingId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    cancelBooking: CancelBooking;
  };

  export type CancelBooking = {
    __typename?: "Event";

    _id: string;

    title: string;
  };
}

export namespace CreateEvent {
  export type Variables = {
    title: string;
    description: string;
    price: number;
    date: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createEvent: Maybe<CreateEvent>;
  };

  export type CreateEvent = {
    __typename?: "Event";

    _id: string;

    title: string;

    description: string;

    price: number;

    date: string;

    creator: Creator;
  };

  export type Creator = {
    __typename?: "User";

    _id: string;

    email: string;
  };
}

export namespace CreateUser {
  export type Variables = {
    email: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createUser: Maybe<CreateUser>;
  };

  export type CreateUser = {
    __typename?: "User";

    _id: string;

    email: string;
  };
}

export namespace Events {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    events: Events[];
  };

  export type Events = {
    __typename?: "Event";

    _id: string;

    title: string;

    description: string;

    price: number;

    date: string;

    creator: Creator;
  };

  export type Creator = {
    __typename?: "User";

    _id: string;

    email: string;
  };
}

export namespace Login {
  export type Variables = {
    email: string;
    password: string;
  };

  export type Query = {
    __typename?: "Query";

    login: Login;
  };

  export type Login = {
    __typename?: "AuthData";

    userId: string;

    token: string;

    tokenExpiration: number;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class BookEventGQL extends Apollo.Mutation<
  BookEvent.Mutation,
  BookEvent.Variables
> {
  document: any = gql`
    mutation BookEvent($eventId: ID!) {
      bookEvent(eventId: $eventId) {
        _id
        createdAt
        updatedAt
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class BookingsGQL extends Apollo.Query<
  Bookings.Query,
  Bookings.Variables
> {
  document: any = gql`
    query Bookings {
      bookings {
        _id
        event {
          _id
          title
          date
        }
        createdAt
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CancelBookingGQL extends Apollo.Mutation<
  CancelBooking.Mutation,
  CancelBooking.Variables
> {
  document: any = gql`
    mutation CancelBooking($bookingId: ID!) {
      cancelBooking(bookingId: $bookingId) {
        _id
        title
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CreateEventGQL extends Apollo.Mutation<
  CreateEvent.Mutation,
  CreateEvent.Variables
> {
  document: any = gql`
    mutation CreateEvent(
      $title: String!
      $description: String!
      $price: Float!
      $date: String!
    ) {
      createEvent(
        eventInput: {
          title: $title
          description: $description
          price: $price
          date: $date
        }
      ) {
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
}
@Injectable({
  providedIn: "root"
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUser.Mutation,
  CreateUser.Variables
> {
  document: any = gql`
    mutation CreateUser($email: String!, $password: String!) {
      createUser(userInput: { email: $email, password: $password }) {
        _id
        email
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class EventsGQL extends Apollo.Query<Events.Query, Events.Variables> {
  document: any = gql`
    query Events {
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
}
@Injectable({
  providedIn: "root"
})
export class LoginGQL extends Apollo.Query<Login.Query, Login.Variables> {
  document: any = gql`
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        userId
        token
        tokenExpiration
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
