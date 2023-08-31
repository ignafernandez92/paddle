import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantsPageComponent } from './pages/participants-page/participants-page.component'

const routes: Routes = [{
    path: '',
    component: ParticipantsPageComponent
},
{
    path: 'participants/:id',
    component: ParticipantsPageComponent
}, 
{
    path: '**',
    component: ParticipantsPageComponent
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParticipantsRoutingModule {}