import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminValidationGuard implements CanActivate, CanLoad {

  role:any = "";
  constructor(private authservice:AuthService,
    private router: Router){

    }
  canActivate(): Observable<boolean>| boolean {
    console.log('canActivate');
    return this.authservice.roleAdminValidation()
      .pipe(
        tap(validate=>{
          if (!validate) {
            this.router.navigateByUrl('/forbidden')
          }
        }
        )
      );
  }
  canLoad(): Observable<boolean>| boolean  {
    console.log('canLoad');
    return this.authservice.roleAdminValidation()
    .pipe(
      tap(validate=>{
        if (!validate) {
          this.router.navigateByUrl('/forbidden')
        }
      }
      )
    );
  }
}
