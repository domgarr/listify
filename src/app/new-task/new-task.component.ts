import { Component, OnInit, Input,Output, ViewChild, EventEmitter, NgModule, ElementRef} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {Task} from '../models/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
  description : string;
  //static:false : set it to True to resolve query results before change detection runs
  @ViewChild('inputTask', {static:false}) inputTask : ElementRef;

  @Output() newTaskAdded = new EventEmitter<Task>();

  constructor() {
  }

  ngOnChanges(chg){
    console.log(chg);
  }

  ngOnInit() {
    this.description = "";
  }

  onKey(value){
    //Check if escape is pressed.

    //console.log(this.description);

    //Using onKey here I emulate Two-way binding. Two way binding using ngModel does not work with MatInput.
    this.description = value;
  }

  onEnterPressed(value){
    console.log(value);
    //TODO: Rename Todo to Task
    //Create new task
    let task = new Task();
    task.userId = 1;
    task.description = value;
    //Make call to DB to add new task.

    //Add returned object to the existing array.
    this.newTaskAdded.emit(task);
    //Set textbox to empty
    this.description = "";
    console.log(this);
    }


}
