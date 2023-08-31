import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsPageComponent } from './pages/clubs-page/clubs-page.component';
import { ClubsRoutingModule } from './clubs-routing.module';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    ClubsPageComponent
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    SharedModule,
  ]
})
export class ClubsModule { }
