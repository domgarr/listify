import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import {NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  error : boolean;
  errorMessage : string;
  loginForm : FormGroup;

  constructor(private loginService: LoginService, private router : Router) {
    this.error = false;
    this.errorMessage = "";
  }

  ngOnInit(){
    //Here is an example of reactive form validation
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(256), Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(256)])
    });
  }

  onSubmit(){
    //The FormGroup loginForm stores the values.
    this.loginService.authenticate(this.loginForm.value).subscribe(
      response => this.loginSuccessHandler(response),
      error => this.loginErrorHandler(error)
      );
  }

  loginSuccessHandler(response){
    switch(response.status){
      case 200 :
        //Upon a successful login the db returns a token and it's saved into localStorage
        //where it will be used to authenticate a user.
        localStorage.setItem("id_token", response.headers.get("Authorization"));
        //After a successful login to go the main page of the app
        this.router.navigateByUrl('/task-lists-page', { skipLocationChange: true });
        break;
      default:
    }
  }

   loginErrorHandler(error : HttpErrorResponse){
    this.error = true;
     switch(error.status){
       case 403 : this.errorMessage = "Incorrect username or password entered.";
         break;
       case 0: this.errorMessage = "There seems to be an error on our end. Please try again later.";
        break;
       default:

     }
   }

//Check the html component code which use getters so that we don't have to reference the object.
get email() { return this.loginForm.get('email'); }

get password() { return this.loginForm.get('password'); }

onSignUpClick(){
  this.router.navigateByUrl('/sign-up', { skipLocationChange: true });
}

}
