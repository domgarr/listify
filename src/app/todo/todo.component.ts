import { Component, OnInit,OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo : Todo;
  description : string;

  //Example of creating a custom event in our child component.
  @Output() enterPressed = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log("Init: " + this.todo.description);
  }

  ngOnChanges(val){
    this.description = this.todo.description;
    console.log("OnChanges: ");
    console.log(val);
  }

  onEnterPressed(value){
    //Update existing task
  }

}
