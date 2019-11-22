import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;
  private signUpUrl = "http://localhost:8080/users/sign-up";
  private usernameUrl = "http://localhost:8080/users/username";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem("id_token"),
      observe:'response'
    })
  };

  constructor(private http : HttpClient) { }

  authenticate(credentials){

    let params = new HttpParams()
      .set("username", credentials.email)
      .set("password", credentials.password);

      console.log(params);

    return this.http.post('http://localhost:8080/login',{}, {params:params, observe:'response'});
  }

  signUp(credentials){
    return this.http.post(this.signUpUrl, credentials);
  }

  getUsername() : Observable<string>{
    return this.http.get<string>(this.usernameUrl, this.httpOptions);
  }
}
