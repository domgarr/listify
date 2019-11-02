import { Component, OnInit, Input,Output, ViewChild, EventEmitter, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';


import {Todo} from '../models/todo';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
  description : string;
  @ViewChild('inputTask') inputTask;

  @Output() newTaskAdded = new EventEmitter<Todo>();

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
    let todo = new Todo();
    todo.userId = 1;
    todo.description = value;
    //Make call to DB to add new task.

    //Add returned object to the existing array.
    this.newTaskAdded.emit(todo);
    //Set textbox to empty
    this.description = "";
    console.log(this);
    }


}
