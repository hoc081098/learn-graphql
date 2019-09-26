import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { EventsComponent } from './events/events.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsService } from './events/events.service';
import { EventsItemComponent } from './events/events-list/events-item/events-item.component';
import { GraphQLModule } from './graphql/graphql.module';
import { CreateEventDialogComponent } from './events/create-event-dialog/create-event-dialog.component';
import { EventDetailDialogComponent } from './events/events-list/event-detail-dialog/event-detail-dialog.component';
import { BookingItemComponent } from './bookings/booking-item/booking-item.component';
import { CancelBookingDialogComponent } from './bookings/cancel-booking-dialog/cancel-booking-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    EventsComponent,
    BookingsComponent,
    EventsListComponent,
    EventsItemComponent,
    CreateEventDialogComponent,
    EventDetailDialogComponent,
    BookingItemComponent,
    CancelBookingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [AuthService, EventsService],
  bootstrap: [AppComponent],
  entryComponents: [
    EventDetailDialogComponent,
    CreateEventDialogComponent,
    CancelBookingDialogComponent,
  ],
})
export class AppModule { }
