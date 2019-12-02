import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username : string;
  @Input() loggedIn: boolean = false;

  constructor(private router : Router, private loginService : LoginService, private ref : ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  renderMenu(){
    let token = localStorage.getItem("id_token");
    if(token != null){
      this.loginService.getUsername().subscribe((json)=> this.extractUsername(json)  );
      this.loggedIn = true;
      this.ref.detectChanges();
    }
  }

  extractUsername(json){
    if(json.username){
      this.username = json.username
    }
  }

  logout(){
    localStorage.removeItem("id_token");
    this.loggedIn = false;
    this.router.navigateByUrl('/user/login');
  }

  //TODO: Users cursor should change when hovering over Listify title to indicate it's clickable.
  onTitleClick(){
    this.router.navigateByUrl('/user/login');
  }

}
