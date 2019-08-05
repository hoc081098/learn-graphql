import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { BookingsComponent } from './bookings/bookings.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: 'events', component: EventsComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: 'login-register', component: LoginRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
