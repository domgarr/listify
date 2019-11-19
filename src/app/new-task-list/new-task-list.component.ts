import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {TaskList} from '../models/task-list';
import {TaskListService} from '../task-list.service';


@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.css']
})
export class NewTaskListComponent implements OnInit {

  taskListName : string;
  renderInput : boolean;

  @Output() newTaskList = new EventEmitter<TaskList>(); //An event consumed by tasklist componenet.
  @ViewChild('inputTaskListName', {static:false}) inputTaskListName : ElementRef;

  constructor(private ref : ChangeDetectorRef, private taskListService : TaskListService) {
    this.taskListName =""
    this.renderInput = false;
  }

  ngOnInit() {
  }

  onEdit(){
    this.renderInput = true;
    this.ref.detectChanges();
    this.inputTaskListName.nativeElement.focus();

  }

  onEnterPressed(taskListName){
    //Check if taskListName is not empty.
    if(taskListName){
      let taskList = new TaskList();
      taskList.name = taskListName;
      //Call a service to add a new Task listTaskId
      this.taskListService.saveTaskList(taskList).subscribe((newTaskList) => this.newTaskList.emit(newTaskList));
      //Clear taskListName to an empty string to resuse component for adding new Task list in the future.
      this.taskListName = "";
    }

    this.focusOffInput()
  }

  focusOffInput(){
    this.renderInput = false;
  }

}
