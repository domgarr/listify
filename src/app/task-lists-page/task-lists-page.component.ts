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
 @ViewChild('header', {static:false}) header;

  constructor(private router: Router) {
 }

 ngOnInit(){

 }

ngAfterViewInit() {
    this.jwt = localStorage.getItem("id_token");
    if(this.jwt == null){
      this.router.navigateByUrl('/login');
    }else{
      this.header.renderMenu();
    }
  }

}
