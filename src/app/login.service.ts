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
      'Content-Type':  'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  authenticate(credentials) : Observable<any>{

    let params = new HttpParams()
      .set("username", credentials.email)
      .set("password", credentials.password);

      console.log(params);

    return this.http.post('http://localhost:8080/login',{}, {params:params, observe:'response'});
  }

  signUp(credentials) : Observable<any>{
    return this.http.post(this.signUpUrl, credentials, {observe : 'response'});
  }

  getUsername() : Observable<String>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem("id_token")
      })
    };

    return this.http.get<string>(this.usernameUrl, httpOptions);
  }
}
