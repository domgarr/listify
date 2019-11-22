import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import {LoginService} from '../login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  error : boolean;
  passwordMatchError : boolean;

  constructor(private loginService : LoginService, private router : Router) {
  this.error = false;
  this.passwordMatchError = false;
}

  ngOnInit() {
  }

  onSubmit(formSignUp : NgForm){
    let credentials = {"username":formSignUp.value.email, "password":formSignUp.value.password};

    if(formSignUp.value.password === formSignUp.value.confirmedPassword){
      this.loginService.signUp(credentials).subscribe(() => this.signUpHandler());
    }else{
      this.passwordMatchError = true;
    }
  }

  signUpHandler(){
    console.log("success");
    console.log(this.router);
    this.router.navigateByUrl("/login");
  }

}
