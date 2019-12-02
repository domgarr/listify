//Unsubscring from HTTP observables is not requried NG2 will cleanup
//https://stackoverflow.com/questions/35042929/is-it-necessary-to-unsubscribe-from-observables-created-by-http-methods
import { Injectable } from '@angular/core';
/*
  HttpClient requests returns rxjs Objservable
*/
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
/*
  For a Service to be available to the DI system and availablle for Injection by angular
  it must be registered using a 'provider'
      'provider': Something that can create or deliver a service.

  In this case, This service will instantiate TodoService and provde the service.
*/
import {Task} from './models/task';

/*
  When providing at the root level. Angular creates a single, shared instance of TodoService
  and injects into any class that asks for it.

  By registering the service as Injectable in the metadata, Angular will optimize the application
  and remove the service if not used.
*/
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskUrl = '/task';

  constructor(private http : HttpClient) { }

  //See Task-List Service
  //Just to be safe, we will mutate the header object containing the auth token every time we make a request.
  getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let id = localStorage.getItem("id_token");
    if(id != null){
      httpOptions.headers = httpOptions.headers.set('Authorization', id );
    }

    return httpOptions;
  }

  //Now that getTodos return an observable the difference is adding subscribe.
  getTasks(taskListId : number): Observable<Task[]> {
    //of(TODOS) will return a single value - array of todos

    return this.http.get<Task[]>(this.taskUrl + "/" + taskListId, this.getHttpOptions());
  }

  saveTask(newTask : Task) : Observable<Task> {
    //TODO: Add error handling.
    return this.http.post<Task>(this.taskUrl, newTask,this.getHttpOptions());
  }

  deleteTask(id : number) : Observable<any> {
    /* ... is the spread operator. It will take all fields from httpOptions
    and spread/copy over to our instanace obj of httpOptions local only to this function.
    */
    let httpOptions = {...this.getHttpOptions()};
    httpOptions['observe'] = 'response' ;
    return this.http.delete<any>(this.taskUrl + "/" + id, httpOptions);
  }

  /* By using PUT, the server considers the entity (Task) to be a modified version of
  the task already existing in the db and request that the existing task be modifed. whilst
  PATCH the existing resource (Task) should be modified to produce a new version.
  */
  updateTask(task : Task) : Observable<any>{
    return this.http.put(this.taskUrl, task, this.getHttpOptions());
  }

  batchUpdateTaskDone(tasks: Task[], id) : Observable<any> {
    //
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : id
      })
    };

    console.log(httpOptions);

    return this.http.put(this.taskUrl + '/' + "is-done", tasks, httpOptions);
  }
}
