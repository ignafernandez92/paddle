import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './tournament/tournament-detail/tournament-detail.component';
import { UserClubComponent } from './user-club/user-club.component';
import { CourtsComponent } from './user-club/courts/courts.component';
import { TournamentZonesComponent } from './tournament/tournament-list/tournament-zones/tournament-zones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    HeaderComponent,
    TournamentComponent,
    TournamentListComponent,
    TournamentDetailComponent,
    UserClubComponent,
    CourtsComponent,
    TournamentZonesComponent,
  
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
