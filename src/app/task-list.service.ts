import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {TaskList} from './models/task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  //If this service is called - it has already passed the token_id check.
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem("id_token")
    })
  };

 private readonly taskListUrl = "/tasklist";

  constructor(private http : HttpClient) { }

  updateHeader(){
    /* When updating headers it is very important to use set() which will return a clone
    of the current header with the change applied! This is because HttpHeader class is immutable.

    Updating headers
    https://angular.io/guide/http
    */

    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", localStorage.getItem("id_token"));
  }

  saveTaskList(taskList : TaskList) : Observable<TaskList> {
    this.updateHeader();
    return this.http.post<TaskList>(this.taskListUrl, taskList, this.httpOptions);
  }

  getAllTaskLists() : Observable<TaskList[]> {
    this.updateHeader();
    return this.http.get<TaskList[]>(this.taskListUrl, this.httpOptions);
  }

  updateTaskListName(taskList : object): Observable<any> {
    this.updateHeader();
    return this.http.put(this.taskListUrl, taskList, this.httpOptionsIncludingObserveResponse());
  }

  deleteTaskList(listId): Observable<any>  {
    this.updateHeader();
    return this.http.delete(this.taskListUrl + '/' + listId,  this.httpOptionsIncludingObserveResponse());
  }

  httpOptionsIncludingObserveResponse() : object {
    let instanceHttpOptions = {...this.httpOptions};
    instanceHttpOptions['observe'] = 'response'; //This should not be an error. It's correct syntax.
    return instanceHttpOptions;
  }

}
