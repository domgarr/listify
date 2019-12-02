import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css']
})
export class TaskListsPageComponent implements OnInit {

  jwt : string;
 @ViewChild('header', {static:false}) header; //Get a reference to the header component so we can call a method.

  constructor(private router: Router) {
 }

 ngOnInit(){
   console.log("Here");
 }

ngAfterViewInit() {
    //Fetch jwt from localStorage.
    this.jwt = localStorage.getItem("id_token");
    console.log("CHeck jwt" + this.jwt);
    //TODO: I really should verify this token is correct and not tampered with before moving pages.
    //If null, we direct the user to the login page.
    if(this.jwt == null){
      this.router.navigateByUrl('user/login');
    }else{
      //If a jwt token is present we can render the user specific menu.
      this.header.renderMenu();
    }
  }

}
