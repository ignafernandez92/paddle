import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantsPageComponent } from './pages/participants-page/participants-page.component';
import { ParticipantsRoutingModule } from './participants-routing.module';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    ParticipantsPageComponent
  ],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    SharedModule,
  ]
})
export class ParticipantsModule { }
