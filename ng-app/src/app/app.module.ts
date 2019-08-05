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
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    EventsComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
