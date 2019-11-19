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
     this.taskListService.getAllTaskLists().subscribe((taskLists) => this.test(taskLists, this.taskLists));
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
      tmp.listId = taskList.listId;
      tmp.userId = taskList.userId;
      tmp.name = taskList.name;
      tmp.tasks = taskList.tasks;

      //console.log(tmp);

      this.taskLists.push(tmp);
    });
    console.log("container: " + this.taskLists);

  //  console.log(taskLists);
  }

  onNewTaskListAdded(newTaskList : TaskList){
    this.taskLists.push(newTaskList);
  }

  onDeleteTaskList(listIdToDelete){
    console.log("In onDeleteTaskList");
    console.log(listIdToDelete);
    let existingTaskList = this.taskLists.find(taskList => listIdToDelete === taskList.listId);
    console.log(existingTaskList);
    let index = this.taskLists.indexOf(existingTaskList);
    console.log(index);
    this.taskLists.splice(index, 1);
  }



}
