import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recovery-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent{
  message:string = "";

  hideForm:boolean = false;
  hideMessage:boolean = true;
  loading:boolean = false;
  newPassword:string ="";
  confirmPassword:string ="";
  blockMatchPassword:boolean = true;
  token : string = "";
  email:string = "";

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.message = "";
      this.confirmPassword = "";
      this.newPassword = "";
      this.route.queryParams.subscribe(params=>{
          this.token = params['token'];
      })
      console.log(this.token);
      
    }

    matchPasswordValidate(){
      
      
      this.newPassword == this.confirmPassword  && this.newPassword.length>=8 ?this.blockMatchPassword = false:this.blockMatchPassword =true;
      console.log('works')    }

  resetPassword (){
    this.loading = true;
    
      this.authService.resetPassword(this.token,this.email,this.newPassword, this.confirmPassword).subscribe(
        resp=>{
          this.hideMessage = false;
          this.hideForm = true;
          resp.message =''?this.message =  'We have some troubles, please re try later.':   this.message =  resp.message;;

        }
      )
  }
}
