import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { tap, map, shareReplay } from 'rxjs/operators';

const LoginQuery = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const CreateUserMutation = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

const tokenKey = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenSubject = new BehaviorSubject<{
    token: string;
    userId: string;
  }>(
    (() => {
      try {
        return JSON.parse(localStorage.getItem(tokenKey));
      } catch {
        return null;
      }
    })()
  );

  constructor(private readonly apollo: Apollo) {}

  login(email: string, password: string): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query({
        query: LoginQuery,
        variables: {
          email,
          password
        }
      })
      .pipe(
        tap(result => {
          const data = result.data.login;

          localStorage.setItem(tokenKey, JSON.stringify(data));
          this.tokenSubject.next(data);

          console.log(`[LOGIN] ${JSON.stringify(data)}`);
        })
      );
  }

  register(
    email: string,
    password: string
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: CreateUserMutation,
        variables: {
          email,
          password
        }
      })
      .pipe(
        tap(result => {
          console.log(`[REGISTER] ${JSON.stringify(result.data.createUser)}`);
        })
      );
  }

  isLoggedIn$() {
    return this.tokenSubject.pipe(
      map(data => !!data),
      shareReplay(1)
    );
  }

  currentUserId$() {
    return this.tokenSubject.pipe(
      map(data => data ? data.userId : null),
      shareReplay(1)
    );
  }

  logout() {
    localStorage.removeItem(tokenKey);
    this.tokenSubject.next(null);
  }
}
