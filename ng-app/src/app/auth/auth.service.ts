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
  private readonly tokenSubject = new BehaviorSubject<string>(
    localStorage.getItem(tokenKey)
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
          const token = result.data.login.token;

          localStorage.setItem(tokenKey, token);
          this.tokenSubject.next(token);

          console.log(`[LOGIN] ${JSON.stringify(result.data.login)}`);
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
      map(token => !!token),
      shareReplay(1)
    );
  }

  logout() {
    localStorage.removeItem(tokenKey);
    this.tokenSubject.next(null);
  }
}
