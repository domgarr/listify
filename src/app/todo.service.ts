import { Injectable } from '@angular/core';
/*
  HttpClient requests returns rxjs Objservable
*/
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
/*
  For a Service to be available to the DI system and availablle for Injection by angular
  it must be registered using a 'provider'
      'provider': Something that can create or deliver a service.

  In this case, This service will instantiate TodoService and provde the service.
*/
import {Todo} from './models/todo';
import {TODOS} from './models/mock-todos';

/*
  When providing at the root level. Angular creates a single, shared instance of TodoService
  and injects into any class that asks for it.

  By registering the service as Injectable in the metadata, Angular will optimize the application
  and remove the service if not used.
*/
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'http://localhost:8080/todos/38'

  constructor(private http : HttpClient) { }

  //Now that getTodos return an observable the difference is adding subscribe.
  getTodos(): Observable<Todo[]> {
    //of(TODOS) will return a single value - array of todos
    return this.http.get<Todo[]>(this.todosUrl);
  }

  setTodoDone() : void {
    //return this.http.post
  }
}
