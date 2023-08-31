import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsPageComponent } from './pages/tournaments-page/tournaments-page.component';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    TournamentsPageComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    SharedModule
  ]
})
export class TournamentsModule { }
