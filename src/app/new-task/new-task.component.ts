import { Component, OnInit, Input,Output, ViewChild, EventEmitter, NgModule, ElementRef, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {Task} from '../models/task';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
  description : string;
  addingNewTask : boolean;

  @Input() listId;
  //static:false : set it to True to resolve query results before change detection runs
  @ViewChild('inputTask', {static:false}) inputTask : ElementRef;

  @Output() newTaskAdded = new EventEmitter<Task>();

  constructor(private ref : ChangeDetectorRef, private taskService : TaskService) {
    this.addingNewTask = false;
  }

  ngOnChanges(chg){
    console.log(chg);
  }

  ngOnInit() {
    this.description = "";
  }

  onKey(value){
    //Using onKey here I emulate Two-way binding. Two way binding using ngModel does not work with MatInput.
    this.description = value;
  }

  onEnterPressed(value){
    //Create new task
    let task = new Task();
    task.listId = this.listId;
    task.description = value.trim();
    task.isDone = false;

    //Make call to DB to add new task.
    this.taskService.saveTask(task).subscribe(task => this.newTaskAdded.emit(task));
    //Add returned object to the existing array.
    //Set textbox to empty
    this.description = "";
    console.log(this);
    }

    onClickAddIcon(){
      this.addingNewTask = true;
      this.ref.detectChanges();
      this.inputTask.nativeElement.focus();
    }

    focusOffInputTask(){
      this.addingNewTask = false;
      this.description ="";
    }


}
