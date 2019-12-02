import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {TaskList} from './models/task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  //If this service is called - it has already passed the token_id check.


 private readonly taskListUrl = "/tasklist";

  constructor(private http : HttpClient) { }

  getHttpOptions(){
    /*
    Issue: 'Authorization' header was being set only once and not mutating After
    a new user logged into the same browser.I think the error stemmed from the httpOption
    object initally being a readonly.

    When updating headers it is very important to use set() which will return a clone
    of the current header with the change applied! This is because HttpHeader class is immutable.

    Nov 30, 2019
    After more testing. Using set on header appended more 'Authorization' headers. I went back to the old
    implmentation and made sure httpOption was not a readonly object.

    Updating headers
    https://angular.io/guide/http
    */
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

  saveTaskList(taskList : TaskList) : Observable<TaskList> {
    return this.http.post<TaskList>(this.taskListUrl, taskList, this.getHttpOptions());
  }

  getAllTaskLists() : Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.taskListUrl, this.getHttpOptions());
  }

  updateTaskListName(taskList : object): Observable<any> {
    return this.http.put(this.taskListUrl, taskList, this.httpOptionsIncludingObserveResponse());
  }

  deleteTaskList(listId): Observable<any>  {
    return this.http.delete(this.taskListUrl + '/' + listId,  this.httpOptionsIncludingObserveResponse());
  }

  httpOptionsIncludingObserveResponse() : object {

    let instanceHttpOptions = {...this.getHttpOptions()};
    instanceHttpOptions['observe'] = 'response'; //This should not be an error. It's correct syntax.
    return instanceHttpOptions;
  }

}
