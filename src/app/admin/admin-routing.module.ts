import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdvertisingComponent } from './advertising/advertising.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'dashboard', component:DashboardComponent},
      {path: 'advertising', component:AdvertisingComponent},
      {path: '**', redirectTo:'dashboard'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
