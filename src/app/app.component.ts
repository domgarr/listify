import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Listify';


  constructor(private router: Router){
  }

  ngOnInit(){
    /*
    This line of code fixed all my issues with refreshing and ensuring on serverside
    - Java Spring - will redirect to index.html upon forbiddeen or unknown URL.

    The problem when i was refreshing on a url such as '/home' upon refresh the server
    would look for a file named accordingly, but that doesn't exist. Only index.html exists so
    now with the line of code below we always navigate back to '' which is the root/index and
    serverside does the same.
    */
    this.router.navigate(['']);
  }


}
