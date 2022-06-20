import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddplayerComponent } from './dashboard/addplayer/addplayer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path:"dashboard",
    component: DashboardComponent
  },
  {
    path:'',
    component: LoginComponent
  },
  {
    path:"dashboard/addPlayer",
    component: AddplayerComponent,
  },
  {
    path:'**',
    component: NotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
