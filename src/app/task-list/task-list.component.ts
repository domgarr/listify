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
    this.taskList.setTaskListName("Morning Routine");
   }

  ngOnInit() {
    //Best practice to init Class here since getTasks is making an async call.
    this.getTasks(38);
  }

  getTasks(listTaskId) : void {
     this.taskService.getTasks(listTaskId).subscribe(tasks => this.taskList.setTasks(tasks));
     console.log(this.taskList);
  }

  onNewTaskAdded(task : Task){
    console.log(task);
    this.taskList.getTasks().push(task);
    console.log(this.taskList);

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

  renameTaskList(newTaskListName : string){
    this.taskList.setTaskListName(newTaskListName);
    this.editingTaskListName = false;

    console.log(this.taskList.getTaskListName());
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
