import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Subject, iif, of, Subscription } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { Router, ActivatedRoute } from '@angular/router';
import { getErrorMessage } from '../util/message.util';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  hidePassword = true;

  readonly emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  readonly passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  private readonly submit$ = new Subject<[string, string, boolean]>();
  private subscription: Subscription;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    interface LoginRegisterResult {
      isLoginMode: boolean;
      result?: ApolloQueryResult<any>;
      error?: any;
    }

    this.subscription = this.submit$
      .pipe(
        exhaustMap(([email, password, isLoginMode]) => {
          return iif(
            () => isLoginMode,
            this.authService.login(email, password),
            this.authService.register(email, password)
          ).pipe(
            map(result => {
              return {
                isLoginMode,
                result
              } as LoginRegisterResult;
            }),
            catchError(error => {
              return of({
                isLoginMode,
                error
              } as LoginRegisterResult);
            })
          );
        })
      )
      .subscribe(result => {
        console.log({ error: result.error });

        if (result.error) {
          const errorMessage = getErrorMessage(result.error);

          this.snackBar.open(
            `${
              result.isLoginMode ? 'Login' : 'Register'
            } failed: ${errorMessage}`,
            undefined,
            {
              duration: 2000
            }
          );
          return;
        }

        this.snackBar.open(
          `${result.isLoginMode ? 'Login' : 'Register'} successfully`,
          undefined,
          {
            duration: 2000
          }
        );

        if (result.isLoginMode) {
          const returnUrl = this.activedRoute.snapshot.queryParamMap.get(
            'returnUrl'
          );
          this.router.navigate([returnUrl || '/events']);
        } else {
          this.isLoginMode = true;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submit() {
    if (!this.emailControl.valid || !this.passwordControl.valid) {
      this.snackBar.open('Invalid email or password', undefined, {
        duration: 2000
      });
      return;
    }
    const email: string = this.emailControl.value;
    const password: string = this.passwordControl.value;
    this.submit$.next([email, password, this.isLoginMode]);
  }

  getEmailErrorMessage(): string {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.emailControl.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.passwordControl.hasError('required')) {
      return 'You must enter password';
    }
    if (this.passwordControl.hasError('minlength')) {
      return 'Min length of password is 6';
    }
    return '';
  }
}
