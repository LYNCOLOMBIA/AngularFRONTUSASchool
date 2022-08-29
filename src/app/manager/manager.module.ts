import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerRoutingModule } from './manager-routing.module';
//Personalized modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    PrimeNgModule,
    SharedModule
    
  ],
  
})
export class ManagerModule { }
