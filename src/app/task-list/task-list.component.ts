import { Component, OnInit,OnDestroy, Input, ElementRef, ChangeDetectorRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {Task} from '../models/task';
import {TaskList} from '../models/task-list';



import {TaskService} from '../task.service';
import {TaskListService} from '../task-list.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

   editingTaskListName = false;

   isDoneBatch : Task[]  = [];

    @Input() taskList : TaskList;
    @ViewChild('inputTaskListName', {static:false}) inputTaskListName : ElementRef;
    @Output() deleteTaskList = new EventEmitter<any>(); //An event consumed by tasklist componenet.


/*
  Upon instantiation Angular will use its DI system to set taskservice to a singleton instance of taskservice.
*/
  constructor(private ref : ChangeDetectorRef, private taskService: TaskService, private taskListService: TaskListService) {
    console.log("TaskList: " + this.taskList);
   }

  ngOnInit() {
    //Best practice to init Class here since getTasks is making an async call.
    this.getTasks(this.taskList.listId);

    window.onbeforeunload = (ev) => {
      this.taskService.batchUpdateTaskDone(this.isDoneBatch).subscribe(response =>{
      });
    }
  }

  ngOnDestroy(){

  }

  getTasks(listTaskId) : void {
     this.taskService.getTasks(listTaskId).subscribe(tasks => this.taskList.tasks = tasks);
     console.log("GetTasks" + this.taskList);
  }

  onNewTaskAdded(task : Task){
    if(!this.taskList.tasks){
      this.taskList.tasks = [];
    }
    this.taskList.tasks.push(task);
    console.log(this.taskList);

  }

  onEditedTask(editedtask: Task){
    let existingtask = this.taskList.tasks.find(task => task.id === editedtask.id );
    let index = this.taskList.tasks.indexOf(existingtask);
    this.taskList.tasks[index] = editedtask;
    console.log(this.taskList.tasks);
  }

  onDeleteTask(taskToDelete : Task){
    console.log(taskToDelete);
    let existingtask = this.taskList.tasks.find(task => task.id === taskToDelete.id );
    let index = this.taskList.tasks.indexOf(existingtask);
    console.log(index);
    this.taskList.tasks.splice(index, 1);
    console.log(this.taskList.tasks);
  }

  renameTaskList(newTaskListName : string){

    let reqTaskList = {...this.taskList};
    reqTaskList.name = newTaskListName;
    reqTaskList.tasks = [];

    this.taskListService.updateTaskListName(reqTaskList).subscribe((response) =>{
      console.log(response);
      this.taskList.name = newTaskListName ;
    });

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
    this.taskListService.deleteTaskList(this.taskList.listId).subscribe( response => {
      console.log(this.taskList.listId);
      this.deleteTaskList.emit(this.taskList.listId);
    });
  }

  onDoneTask(task : Task){
    console.log("Called onDoneTask")
    this.isDoneBatch.push(task);
  }


}
