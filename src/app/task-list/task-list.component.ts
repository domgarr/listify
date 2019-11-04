import { Component, OnInit, Input } from '@angular/core';
import {Task} from '../models/task';
import {TaskList} from '../models/task-list';


import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

    taskList : TaskList;
    tasks : Task[] = [
      {"userId":1, "listId":38, "description":"Drink one cup of water", "isDone":false},
      {"userId":3, "listId":38,"description":"Drink one cup of Coffee", "isDone":false},
      {"userId":2, "listId":38,"description":"Eat a banana", "isDone":false}
    ];


/*
  Upon instantiation Angular will use its DI system to set taskservice to a singleton instance of taskservice.
*/
  constructor(private taskService: TaskService) {
    this.taskList = new TaskList("Placeholder", this.tasks );
   }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() : void {
    //Revist the => function
    //This statement will wait for Observable to emit an array of tasks.
    //this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    console.log(this.taskList.getTasks());
  }

  onNewTaskAdded(task : Task){
    console.log(task);
    this.taskList.getTasks().push(task);
  }

  onEditedTask(editedtask: Task){
    let existingtask = this.taskList.getTasks().find(task => task.userId === editedtask.userId );
    let index = this.taskList.getTasks().indexOf(existingtask);
    this.taskList.getTasks()[index] = editedtask;
    console.log(this.taskList.getTasks());
  }

  onDeleteTask(taskToDelete : Task){
    console.log(taskToDelete);
    let existingtask = this.taskList.getTasks().find(task => task.userId === taskToDelete.userId );
    let index = this.taskList.getTasks().indexOf(existingtask);
    console.log(index);
    this.taskList.getTasks().splice(index, 1);
    console.log(this.taskList.getTasks());
  }

}
