import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { tap, map, shareReplay } from 'rxjs/operators';
import { LoginGQL, Login, CreateUserGQL } from '../generated/graphql';
import { Apollo } from 'apollo-angular';

export const AUTH_KEY = 'AUTH_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authSubject = new BehaviorSubject<{
    token: string;
    userId: string;
  }>(
    (() => {
      try {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
      } catch {
        return null;
      }
    })()
  );

  constructor(
    private readonly createUserGQL: CreateUserGQL,
    private readonly loginGQL: LoginGQL
  ) {}

  login(
    email: string,
    password: string
  ): Observable<ApolloQueryResult<Login.Query>> {
    return this.loginGQL
      .fetch({
        email,
        password
      })
      .pipe(
        tap(result => {
          const data = result.data.login;

          localStorage.setItem(AUTH_KEY, JSON.stringify(data));
          this.authSubject.next(data);

          console.log('[LOGIN] ', data);
        })
      );
  }

  register(email: string, password: string) {
    return this.createUserGQL.mutate({ email, password }).pipe(
      tap(result => {
        console.log('[REGISTER] ', result.data.createUser);
      })
    );
  }

  isLoggedIn$() {
    return this.authSubject.pipe(
      map(data => !!data),
      shareReplay(1)
    );
  }

  currentToken(): string | null {
    const data = this.authSubject.value;
    return data ? data.token : null;
  }

  currentUserId$() {
    return this.authSubject.pipe(
      map(data => (data ? data.userId : null)),
      shareReplay(1)
    );
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
    this.authSubject.next(null);
  }
}
