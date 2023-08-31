import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubsPageComponent } from './pages/clubs-page/clubs-page.component';

const routes: Routes = [{
    path: '',
    component: ClubsPageComponent
},
{
    path: 'clubs/:id',
    component: ClubsPageComponent
},
{
    path: '**',
    component: ClubsPageComponent
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClubsRoutingModule {}

