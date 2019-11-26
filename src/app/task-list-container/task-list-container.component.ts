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
    //Get all TaskLists assoicated with the user.
     this.taskListService.getAllTaskLists().subscribe((taskLists) => this.populateTaskListWithTasks(taskLists, this.taskLists));
  }

  /* This method will populate TaskList array with TaskLists fetched from the server
  two parameters are given. The json response holding the TaskList object and an empty TaskList array
  that our application uses to store the users TaskLists */
  populateTaskListWithTasks(jsonTask, taskLists) {
    //Run the Json object literal through a stream creating a TaskList model and populating the values;
    jsonTask.forEach((taskList) => {
      let tmp = new TaskList();
      tmp.listId = taskList.listId;
      tmp.userId = taskList.userId;
      tmp.name = taskList.name;
      tmp.tasks = taskList.tasks;

      this.taskLists.push(tmp);
    });
  }

  //An event will call this method when the user deletes a TaskList.
  onNewTaskListAdded(newTaskList : TaskList){
    this.taskLists.push(newTaskList);
  }

  onDeleteTaskList(listIdToDelete){
    let existingTaskList = this.taskLists.find(taskList => listIdToDelete === taskList.listId);
    let index = this.taskLists.indexOf(existingTaskList);
    this.taskLists.splice(index, 1);
  }



}
