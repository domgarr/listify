import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Task} from '../models/task';
import {TaskList} from '../models/task-list';


import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  editingTaskListName = false;

    taskList : TaskList;


    @ViewChild('inputTaskListName', {static:false}) inputTaskListName : ElementRef;

/*
  Upon instantiation Angular will use its DI system to set taskservice to a singleton instance of taskservice.
*/
  constructor(private ref : ChangeDetectorRef, private taskService: TaskService) {
    this.taskList = new TaskList( );
    this.taskList.name = "Morning Routine";
   }

  ngOnInit() {
    //Best practice to init Class here since getTasks is making an async call.
    this.getTasks(38);
  }

  getTasks(listTaskId) : void {
     this.taskService.getTasks(listTaskId).subscribe(tasks => this.taskList.tasks = tasks);
     console.log(this.taskList);
  }

  onNewTaskAdded(task : Task){
    console.log(task);
    this.taskList.tasks.push(task);
    console.log(this.taskList);

  }

  onEditedTask(editedtask: Task){
    let existingtask = this.taskList.tasks.find(task => task.taskId === editedtask.taskId );
    let index = this.taskList.tasks.indexOf(existingtask);
    this.taskList.tasks[index] = editedtask;
    console.log(this.taskList.tasks);
  }

  onDeleteTask(taskToDelete : Task){
    console.log(taskToDelete);
    let existingtask = this.taskList.tasks.find(task => task.taskId === taskToDelete.taskId );
    let index = this.taskList.tasks.indexOf(existingtask);
    console.log(index);
    this.taskList.tasks.splice(index, 1);
    console.log(this.taskList.tasks);
  }

  renameTaskList(newTaskListName : string){
    this.taskList.name = newTaskListName ;
    this.editingTaskListName = false;

    console.log(this.taskList.name);
  }

  onEditTaskListName(){
    this.editingTaskListName = true;
    this.ref.detectChanges();
    this.inputTaskListName.nativeElement.focus();
  }

  focusOffEditTaskListName(){
    this.editingTaskListName = false;
  }

  onDeleteTaskList(){
    //TODO
  }


}
