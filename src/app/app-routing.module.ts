import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenValidationGuard } from './guards/token-validation.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { RoleAdminValidationGuard } from './guards/role-admin-validation.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { GameResultsComponent } from './reports/game-results/game-results.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren:()=> import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren:()=> import ('./admin/admin.module').then(m => m.AdminModule),
    // canActivate:[RoleAdminValidationGuard],
    // canLoad:[RoleAdminValidationGuard]
  },

  {
    path: 'manager/dashboard',
    loadChildren:()=> import ('./manager/manager.module').then(m => m.ManagerModule),
    canActivate:[TokenValidationGuard],
    canLoad:[TokenValidationGuard]
  },
  { path: 'forbidden', component: NotAuthorizedComponent },
  { path: 'game_results', component: GameResultsComponent },
  // {
  //   path:'**',pathMatch: 'full',
  //   component:PageNotFoundComponent
  // },
  {
    path:'',redirectTo: 'auth/login', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
