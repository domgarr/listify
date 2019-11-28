import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  authenticated = false;

  private signUpUrl = "/users/sign-up";
  private usernameUrl = "/users/username";

  constructor(private http : HttpClient) { }
  /*To authenticate we post request to the server with username and password values
    embedded into the url. This is normal practice to send a plaintext password.
    We will be using HTTPS so the url will be encrypted.

    Upon a successfull login the JWT will be stored in local storage and added to the
    header to authorize any requests where needed.
    */
  authenticate(credentials) : Observable<any>{
    let params = new HttpParams()
      .set("username", credentials.email)
      .set("password", credentials.password);
    return this.http.post('http://localhost:8080/login',{}, {params:params, observe:'response'});
  }

  /* For authenticate and signUp we are subscribing to an event containing the response
  so we can verify the status and handle errors if needed */
  signUp(credentials) : Observable<any>{
    return this.http.post(this.signUpUrl, credentials, {observe : 'response'});
  }
  /* For getting username we need to fetch the JWT stored in local storage and attach
  in the header 'Authorization' to be able to access the endpoint that returns a username
  attached to that JWT */
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
