
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { TournamentComponent } from './Tournament/tournament.component';
import { UserClubComponent } from './user-club/user-club.component';
import { TournamentListComponent } from './Tournament/tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './Tournament/tournament-detail/tournament-detail.component';
import { TournamentItemComponent } from './Tournament/tournament-list/tournament - item/tournament-item.component';
import { RegisteredCompetitorsComponent } from 'app/user-club/registered-competitors/registered-competitors.component'
import { CourtsComponent } from './courts/courts.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MatIconModule } from '@angular/material/icon';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';  

defineLocale('es', esLocale); // Importa el idioma español


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    TournamentComponent,
    UserClubComponent,
    TournamentListComponent,
    TournamentDetailComponent,
    TournamentItemComponent,
    RegisteredCompetitorsComponent,
    CourtsComponent,
    PaginationComponent,
    NewTournamentComponent,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

