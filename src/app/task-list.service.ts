import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {TaskList} from './models/task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

 private readonly taskListUrl = "http://localhost:8080/tasklist";

  constructor(private http : HttpClient) { }

  saveTaskList(taskList : TaskList) : Observable<TaskList> {
    return this.http.post<TaskList>(this.taskListUrl, taskList);
  }

  getAllTaskListByUserId(userId : number) : Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.taskListUrl + '/' + userId);
  }

}
