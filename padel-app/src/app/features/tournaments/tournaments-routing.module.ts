import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsPageComponent } from './pages/tournaments-page/tournaments-page.component'

const routes: Routes = [{
    path: '',
    component: TournamentsPageComponent
},
{
    path: 'tournaments/:id',
    component: TournamentsPageComponent
}, 
{
    path: '**',
    component: TournamentsPageComponent
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentsRoutingModule {}