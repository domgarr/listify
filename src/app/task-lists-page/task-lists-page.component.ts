import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css']
})
export class TaskListsPageComponent implements OnInit {

  jwt : String;

  constructor(private router: Router) { }

  ngOnInit() {
    this.jwt = localStorage.getItem("id_token");
    if(this.jwt == null){
      this.router.navigateByUrl('/login');
    }
  }

}
