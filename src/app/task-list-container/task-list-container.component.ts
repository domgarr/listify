import { Component, OnInit, Input } from '@angular/core';

import {TaskList} from '../models/task-list';
import {TaskListService} from '../task-list.service';

@Component({
  selector: 'app-task-list-container',
  templateUrl: './task-list-container.component.html',
  styleUrls: ['./task-list-container.component.css']
})
export class TaskListContainerComponent implements OnInit {

  @Input() taskLists : TaskList[] ;

  constructor(private taskListService : TaskListService) {
    this.taskLists = [];
  }

  ngOnInit() {
     this.taskListService.getAllTaskListByUserId(1).subscribe((taskLists) => this.test(taskLists, this.tasksLists));
     console.log("container: " + this.taskLists);
  }

  tester(taskLists){
    console.log(taskLists);
  }

  test(jsonTask, taskLists) {
  //  console.log(this);
  //  console.log(jsonTask);
    jsonTask.forEach((taskList) => {
    //  console.log(taskList);
      let tmp = new TaskList();
      tmp.taskListId = taskList.listId;
      tmp.userId = taskList.userId;
      tmp.name = taskList.name;
      tmp.tasks = taskList.tasks;

      //console.log(tmp);

      this.taskLists.push(tmp);
    });
    console.log("container: " + this.taskLists);

  //  console.log(taskLists);
  }



}
