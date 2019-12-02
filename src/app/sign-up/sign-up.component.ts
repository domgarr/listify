import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import {LoginService} from '../login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  error : boolean; //General error boolean check.
  passwordMatchError : boolean; //True when password and confirmed password do not match.
  signUpForm : FormGroup;

  constructor(private loginService : LoginService, private router : Router) {
  this.error = false; //General error
  this.passwordMatchError = false; //Error indicating password and confirmedPassword do not match.
}
  //Init the formGroup that takes care of dynamic form validation.
  ngOnInit() {
    //Here we init the form controls to dynamically validate the form.
    this.signUpForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256), Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]),
      confirmedPassword : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(256)])
    });
  }

  onSubmit(){
    //Create an object literal to send in post request.
    let credentials = {"username":this.signUpForm.value.email, "password":this.signUpForm.value.password};
    //Before sending post request check passwords match.
    if(this.signUpForm.value.password === this.signUpForm.value.confirmedPassword){
      this.loginService.signUp(credentials).subscribe(
        () => this.signUpHandler(),
        (err) =>this.signUpErrorHandler(err)
      );
    }else{
      this.passwordMatchError = true; //Setting this true will render an error message.
    }
  }

  signUpHandler(){
    /* Upon creating a user successfully direct the user to the login page.
    NOTE: skipLocationChange is not hiding the URL */
    this.router.navigateByUrl("user/login");
  }

  //TODO:
  signUpErrorHandler(err){

  }
  //Helpers used in the HTML document for easy access.
  get email(){return this.signUpForm.get('email');}
  get password(){return this.signUpForm.get('password');}
  get confirmedPassword(){return this.signUpForm.get('confirmedPassword');}
}
