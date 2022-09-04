import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

//Personalized modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
 


@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    RecoveryPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,

      
  ]
})
export class AuthModule { }
