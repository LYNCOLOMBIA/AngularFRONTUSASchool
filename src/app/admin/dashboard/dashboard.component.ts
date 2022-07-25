import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { User} from '../../auth/interfaces/interfaces';
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[MessageService]
})
export class DashboardComponent {


  get loggedUser(){
    return this.authservice.loggedUser;
  }
  

  userDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];
  
  user: User = {};

  selectedUsers: User[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  roles: any[] = [];

  loading: boolean = true;
  
  @ViewChild('dt')
    table!: Table;

  rowsPerPageOptions = [5, 10, 20];
  constructor(private router: Router,
    private authservice:AuthService,
    private messageService: MessageService,
    private userService: UserService ) { }

  ngOnInit() {
      this.userService.userAccess().subscribe(
        resp=>{
            this.users = resp;
            this.loading = false;
        }
      );

      this.cols = [
          { field: 'code', header: 'code' },
          { field: 'first_name', header: 'first_name' },
          { field: 'last_name', header: 'last_name' },
          { field: 'email', header: 'email' },
          { field: 'created_at', header: 'created_at' },
          { field: 'role_name', header: 'role_name' },
      ];

      this.roles = [
          { label: 'Admin', value: 'Admin' },
          { label: 'Meister', value: 'Meister' },
          { label: 'Manager', value: 'Manager' }
      ];
  }

logout(){
      this.router.navigateByUrl('/auth/login');
      this.authservice.logout()
        .subscribe();
    }

  openNew() {
      this.user = {};
      this.submitted = false;
      this.userDialog = true;
  }

  deleteSelectedUsers() {
      this.deleteUsersDialog = true;
  }

  editUser(user: User) {
      this.user = { ...this.user };
      this.userDialog = true;
  }

  deleteUser(user: User) {
      this.deleteUserDialog = true;
      this.user = {...this.user };
  }

  confirmDeleteSelected() {
      this.deleteUsersDialog = false;
      this.users = this.users.filter(val => !this.selectedUsers.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      this.selectedUsers = [];
  }

  confirmDelete() {
      this.deleteUserDialog = false;
      this.users = this.users.filter(val => val.id !== this.user.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      this.user = {};
  }

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  saveUser() {
      this.submitted = true;


          if (this.user.id) {
              // @ts-ignore
              this.user.inventoryStatus = this.user.inventoryStatus.value ? this.user.inventoryStatus.value : this.user.inventoryStatus;
              this.users[this.findIndexById(this.user.id)] = this.user;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
          } else {
              this.user.id = this.createId();
              this.user.first_name = this.createId();
              this.user.last_name = 'user-placeholder.svg';
              // @ts-ignore
              this.user.inventoryStatus = this.user.inventoryStatus ? this.user.inventoryStatus.value : 'INSTOCK';
              this.users.push(this.user);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
          }

          this.users = [...this.users];
          this.userDialog = false;
          this.user = {};
    
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onFilter(event: Event,field:string,stringVal:string) {
      this.table.filter((event.target as HTMLInputElement).value, field,stringVal);
      console.log(stringVal)
  }

  onGlobalFilter(event: Event,stringVal:string) {
      this.table.filterGlobal((event.target as HTMLInputElement).value, stringVal);

  }
  onDateSelect(value:Date) {
    this.table.filter(this.formatDate(value), 'created_at', 'contains');
    console.log(this.formatDate(value))
    }


    formatDate(date:any) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }


}
