import { Component, OnInit, Input } from '@angular/core';
import {Task} from '../models/task';

import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks : Task[] =[
    {"userId":1, "listId":38, "description":"Drink one cup of water", "isDone":false},
    {"userId":3, "listId":38,"description":"Drink one cup of Coffee", "isDone":false},
    {"userId":2, "listId":38,"description":"Eat a banana", "isDone":false}
  ];

/*
  Upon instantiation Angular will use its DI system to set taskservice to a singleton instance of taskservice.
*/
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() : void {
    //Revist the => function
    //This statement will wait for Observable to emit an array of tasks.
    //this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    console.log(this.tasks);
  }

  onNewTaskAdded(task : Task){
    console.log(task);
    this.tasks.push(task);
  }

  onEditedTask(editedtask: Task){
    let existingtask = this.tasks.find(task => task.userId === editedtask.userId );
    let index = this.tasks.indexOf(existingtask);
    this.tasks[index] = editedtask;
    console.log(this.tasks);
  }

  onDeleteTask(taskToDelete : Task){
    console.log(taskToDelete);
    let existingtask = this.tasks.find(task => task.userId === taskToDelete.userId );
    let index = this.tasks.indexOf(existingtask);
    console.log(index);
    this.tasks.splice(index, 1);
    console.log(this.tasks);
  }

}
