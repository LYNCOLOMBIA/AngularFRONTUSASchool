import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {path:'login', component:LoginComponent},
      {path:'recovery-password', component:RecoveryPasswordComponent},
      {path:'**', redirectTo:'login'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
