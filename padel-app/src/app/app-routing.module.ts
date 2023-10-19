import { Component, NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard'; 
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TournamentComponent } from './Tournament/tournament.component';
import { UserClubComponent } from './user-club/user-club.component';
import { CourtsComponent } from './courts/courts.component';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'registration', component: RegistrationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'tournament', component: TournamentComponent},
  { path: 'user-club', component: UserClubComponent},
  { path: 'courts', component: CourtsComponent},
  { path: 'new-tournament', component: NewTournamentComponent}]
    @NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, useHash:false })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],

})
export class AppRoutingModule { }