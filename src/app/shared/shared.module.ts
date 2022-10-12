import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PrimeNgModule } from "../prime-ng/prime-ng.module";




@NgModule({
  exports:[
    NavbarComponent
  ],
  declarations: [
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ]
})
export class SharedModule { }
