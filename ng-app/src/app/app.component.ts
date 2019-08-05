import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout();
    if (this.router.url === '/bookings') {
      this.router.navigate(['/login-register']);
    }
  }
}
