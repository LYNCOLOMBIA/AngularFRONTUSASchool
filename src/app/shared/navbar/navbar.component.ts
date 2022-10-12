import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Output()callLogout = new EventEmitter();
    @Input('dash') dashName = '';

  items!: MenuItem[];
  ngOnInit() {


    if(this.dashName == 'admin'){

      this.items = [

        {
            label:'Users',
            icon:'pi pi-fw pi-user',
            routerLink:['/admin/dashboard']
        },
        
        {
          label:'Advertising',
          icon:'pi pi-fw pi-globe',
          routerLink:['/admin/advertising']
        }
    ];
    }
    else{
      this.items = [
    ];
    }

}    
    constructor(private router: Router,private authService:AuthService) { }
    logout(){
        this.router.navigateByUrl('/auth/login');
        this.authService.logout()
          .subscribe();
      }
  


}
