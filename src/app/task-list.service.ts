import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {TaskList} from './models/task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  //If this service is called - it has already passed the token_id check.
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem("id_token")
    })
  };

 private readonly taskListUrl = "http://localhost:8080/tasklist";

  constructor(private http : HttpClient) { }

  saveTaskList(taskList : TaskList) : Observable<TaskList> {
    return this.http.post<TaskList>(this.taskListUrl, taskList, this.httpOptions);
  }

  getAllTaskLists() : Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.taskListUrl,this.httpOptions);
  }

  updateTaskListName(taskList : object): Observable<any> {
    return this.http.put(this.taskListUrl, taskList, this.httpOptions);
  }

  deleteTaskList(listId): Observable<any>  {
    return this.http.delete(this.taskListUrl + '/' + listId, this.httpOptions);
  }

}