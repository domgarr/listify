import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  error : boolean;
  renderMenu : boolean;

  constructor(private loginService: LoginService, private router : Router) {
    this.error = false;
    this.renderMenu = false;
  }

//  this.router.navigateByUrl('/');

  onSubmit(f : NgForm){
    console.log(f.value);
    this.loginService.authenticate(f.value).subscribe(
      response => this.loginHandler(response),
      error => this.loginErrorHandler(error)
      );
  }

  loginHandler(response){
    console.log(response);
    switch(response.status){
      case 200 :
        console.log(response.headers.get("Authorization"));
        localStorage.setItem("id_token", response.headers.get("Authorization"));
        this.renderMenu = true;
        this.router.navigateByUrl('/task-lists-page');
        break;
      default:
        console.log("Status not mapped");
    }
  }

   loginErrorHandler(error : HttpErrorResponse){
     console.log("Cuahgt");
     console.log(error);
     switch(error.status){
       case 403 : this.error = true;
         break;
       default:
         console.log("Status not mapped");
     }
   }

}
