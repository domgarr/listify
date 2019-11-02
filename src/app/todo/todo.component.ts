import { Component, OnInit,OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Todo} from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
//  @ViewChild('#inputTask') inputTask:ElementRef;

  @Input() todo : Todo;
  description : string;
  focus : boolean;
  //Example of creating a custom event in our child component.
  @Output() enterPressed = new EventEmitter<string>();

  @ViewChild('inputTask') inputTask: ElementRef;

  constructor(private changeDetector : ChangeDetectorRef) { }

  ngAfterViewInit(){
  }

  ngOnInit() {
    this.focus = false;
    console.log("Init: " + this.todo.description);
  }

  ngOnChanges(val){
    this.description = this.todo.description;
    console.log("OnChanges: ");
    console.log(val);
  }

  onEnterPressed(value){
    //Update existing task
    this.description = value;
    this.offFocus();
  }

  onFocus(){
    this.focus = !this.focus;
  }

  offFocus(){
    this.focus = !this.focus;
    console.log("lost focus on modal!");
  }

  onEdit(){
    this.onFocus();
    //After onFocus() is called, the input is rendered. Prior to this the input is undefined.
    //detectChanges() will check the view for any new rendered elements.
    this.changeDetector.detectChanges();
    //Set focus on the input
    this.inputTask.nativeElement.focus();
  }



}
