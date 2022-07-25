import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  myForm: FormGroup =this.fb.group({
    email: ['andreygarzonquiroga@gmail.com',[Validators.required, Validators.email]],
    password: ['password',[Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb:FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  login(){

    const {email,password} = this.myForm.value;
    this.authService.login(email,password)
      .subscribe(resp=>{ 
        if(resp.access_token !== undefined){
          this.router.navigateByUrl('/dashboard');
          this.authService.getLoggedInUser(resp.access_token)
          .subscribe(user=>{
          });
        }
        else{
          Swal.fire({
            title: 'Error!',
            text: resp,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#2563EB',
          })
        }

      })

  }
}
