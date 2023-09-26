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
import { TournamentComponent } from './Tournament/tournament.component';
import { TournamentListComponent } from './Tournament/tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './Tournament/tournament-detail/tournament-detail.component';
import { UserClubComponent } from './user-club/user-club.component';
import { CourtsComponent } from './user-club/courts/courts.component';
import { TournamentZonesComponent } from './Tournament/tournament-detail/tournament-zones/tournament-zones.component';
import { TournamentItemComponent } from './Tournament/tournament-list/tournament - item/tournament-item.component';

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
    TournamentItemComponent
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
export class AppModule {
}
