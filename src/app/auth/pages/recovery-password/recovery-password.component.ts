import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent{

  myForm: FormGroup =this.fb.group({
    email: ['andreygarzonquiroga@gmail.com',[Validators.required, Validators.email]]
  });

  constructor(private fb:FormBuilder) { }

  login(){
    console.log(this.myForm.value)
    console.log(this.myForm.valid)
  }

}
