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
