import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { User} from '../../auth/interfaces/interfaces';
import { Role} from './interfaces/interfaces';
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  //PrimeNg Table Variables
  userDialog: boolean = false;

  userPassDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];
  
  user: User = {};

  selectedUsers: User[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  roles!: Role[];
  roles_drop!:any[];

  selectedRole:Role = {};

  loading: boolean = true;
  
  @ViewChild('dt') table!: Table;
  rowsPerPageOptions = [5, 10, 20];


  constructor(private router: Router,
    private authservice:AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private fb:FormBuilder, ) { }

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
          { field: 'created_date', header: 'created_date' },
          { field: 'role_name', header: 'role_name' },
      ];

      this.roles = [
          { role_name: 'Admin', role_id: '1' },
          { role_name: 'Meister', role_id: '2' },
          { role_name: 'Manager', role_id: '3' }
      ];
      this.roles_drop = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Meister', value: 'Meister' },
        { label: 'Manager', value: 'Manager' }
    ];
  }



    //Reactive forms

  //Update Password User Reactive Form
  updateUserForm: FormGroup =this.fb.group({
    first_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    role_id: ['',[Validators.required]],
    email: ['',[Validators.required]],
  });
  updatePassForm: FormGroup =this.fb.group({
    password: ['',[Validators.required, Validators.minLength(8)]],
  });
  //PrimeNg functions
  openNew() {
      this.user = {};
      this.updateUserForm.reset();
      console.log(this.updateUserForm.value)
      this.submitted = false;
      this.userDialog = true;
  }

  deleteSelectedUsers() {
      this.deleteUsersDialog = true;

  }

  editUser(user: User) {
      this.user = { ...user };
      this.updateUserForm.patchValue(user);
      this.userDialog = true;
  }
  editPassUser(user: User) {
    this.user = { ...user };
    this.userPassDialog = true;
    console.log(this.user);
  }

  deleteUser(user: User) {
      this.deleteUserDialog = true;
      this.user = {...user };
      console.log(user);
  }

  

  confirmDeleteSelected() {
      this.deleteUsersDialog = false;
      
      this.userService.deleteAllUser(this.selectedUsers).subscribe(
        resp=>{
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));
            this.messageService.add({ severity: 'info', summary: 'User deleting', detail: resp, life: 3000 });
            this.selectedUsers = [];
        }
    );


  }

  confirmDelete() {
      this.deleteUserDialog = false;
      this.userService.deleteUser(this.user.id!).subscribe(
        resp=>{
            this.users = this.users.filter(val => val.id !== this.user.id);
            this.messageService.add({ severity: 'info', summary: 'User deleting', detail: resp, life: 3000 });
            this.user = {};
        });
  }

    //Hide user update and user save dialog
  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
    }
    //Only Hide user password update dialog
  hidePassDialog() {
    this.userPassDialog = false;
    this.submitted = false;
    }


  saveUser() {
    
      let userUpdateForm:User =this.updateUserForm.value;
      let findRoleName = this.roles.find((role)=>role.role_id === userUpdateForm.role_id)?.role_name;
      let userUpdate:User = {
        id:this.user.id,
        first_name:userUpdateForm.first_name,
        last_name:userUpdateForm.last_name,
        created_date:this.user.created_date,
        role_name:findRoleName? findRoleName:this.user.role_name,
        email:userUpdateForm.email,
        role_id:userUpdateForm.role_id
      }
      
      this.submitted = true;
          if (this.user.id) {
            this.users[this.findIndexById(userUpdate.id!)] = userUpdate;
              this.userService.updateUser(userUpdate).subscribe(
                resp=>{
                  this.messageService.add({ severity: 'info', summary: 'User Updating', detail: resp.message, life: 3000 });
                  this.userService.userAccess().subscribe(
                    resp=>{
                        this.users = resp;
                        this.loading = false;
                    }
                  );
                }
              )
          } else {
              this.user.first_name = userUpdateForm.first_name;
              this.user.last_name = userUpdateForm.last_name;
              this.user.email =  userUpdateForm.email;
              this.user.role_id =  userUpdateForm.role_id;
              this.user.role_name = findRoleName? findRoleName:this.user.role_name,
              this.user.password = userUpdateForm.email;
              this.userService.storeUser(this.user).subscribe(
                resp=>{
                  console.log(resp);
                  this.messageService.add({ severity: 'info', summary: 'User creation', detail: resp.message, life: 3000 });

                  this.userService.userAccess().subscribe(
                    resp=>{
                        this.users = resp;
                        this.loading = false;
                    }
                  );
                }
              )


          }

          this.userDialog = false;
          this.userPassDialog = false;
          this.user = {};
  }

  updateUserPass() {

        this.users[this.findIndexById(this.user.id!)] = this.user;

        this.userService.updateUser(this.user).subscribe(
          resp=>{
            this.messageService.add({ severity: 'info', summary: 'User pass updating', detail: resp.message, life: 3000 });
          }
        );
        this.userPassDialog = false;
        this.user = {};
        this.updatePassForm.patchValue(this.user);

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


  onFilter(event: Event,field:string,stringVal:string) {
      this.table.filter((event.target as HTMLInputElement).value, field,stringVal);
      console.log(stringVal)
  }

  onGlobalFilter(event: Event,stringVal:string) {
      this.table.filterGlobal((event.target as HTMLInputElement).value, stringVal);

  }
  onDateSelect(value:Date) {
    this.table.filter(this.formatDate(value), 'created_date', 'equals');
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
