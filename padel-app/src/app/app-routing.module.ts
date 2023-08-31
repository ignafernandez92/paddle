import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'clubs',
    loadChildren: () => import('./features/clubs/clubs.module'). then(m => m.ClubsModule)
  },

  { path: 'participants',
    loadChildren: () => import('./features/participants/participants.module'). then(m => m.ParticipantsModule)
  },

  { path: 'tournaments',
    loadChildren: () => import('./features/tournaments/tournaments.module'). then(m => m.TournamentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }