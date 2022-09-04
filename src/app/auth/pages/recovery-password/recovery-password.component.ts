import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent{
  message:string = "";

  hideForm:boolean = false;
  hideMessage:boolean = true;
  loading:boolean = false;

  myForm: FormGroup =this.fb.group({
    email: ['',[Validators.required, Validators.email]]
  });

  constructor(private fb:FormBuilder,
    private authService: AuthService,) { }

    ngOnInit(): void {
      this.message = "";
      
    }

  sendEmailToRecoveryPassword (){
    this.loading = true;
    console.log(this.myForm.value)
      this.authService.sendEmailToRecoveryPassword(this.myForm.value.email).subscribe(
        resp=>{
          this.hideMessage = false;
          this.hideForm = true;
          resp.status =''?this.message =  'We have some troubles, please re try later.':   this.message =  resp.status;;

        }
      )
  }
}
