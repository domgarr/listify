import { Component, OnInit,OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Task} from '../models/task';

import {TaskService} from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task : Task;
  @Output() editedTask = new EventEmitter<Task>(); //An event consumed by tasklist componenet.
  @Output() deleteTask = new EventEmitter<Task>(); //An event consumed by tasklist componenet.
  @Output() doneTask = new EventEmitter<Task>(); //An event consumed by tasklist componenet.


  defaultCardTaskClasses : string = "task mb-3 mt-3";
  cardTaskClasses : string;

  renderInputTask : boolean; //Used for controlling the rendering of task or editTask. When false, the edit option is not rendered.

  @ViewChild('inputTask', {static:false}) inputTask: ElementRef; //Looks for the element containing #inputTask and gets a reference to it.

  constructor(private changeDetector : ChangeDetectorRef, private taskService : TaskService) {
    this.renderInputTask = false;
    this.cardTaskClasses = this.defaultCardTaskClasses;
  }
  /*
    Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
  */
  ngOnInit(){
    this.cardBackgroundColorChange();
  }

  //When enter is pressed whilst focused on inputTask, update the existing task.
  onEnterPressed(taskValue){
    // Lose focus and just show the paragraph.
    this.focusOffInput();
    if(taskValue.localeCompare(this.task.description) != 0 ){
      this.task.description = taskValue;
      this.taskService.updateTask(this.task).subscribe((response) => {
        console.log(response);
        this.editedTask.emit(this.task);
      })
    }
  }

  onDeletePressed(){
    console.log("onDelte: " + this.task.id);
    this.taskService.deleteTask(this.task.id).subscribe((response) => this.deleteStatusCheck(response));
  }

  deleteStatusCheck(response){
    if(response.status === 200){
      this.deleteTask.emit(this.task);
    }
  }

  //Called when the edit icon is clicked next to a task.
  onEdit(){
    this.focusOnInput();

    /*
     After focusOnInput() is called, the input is rendered. Prior to this the input is undefined.
    detectChanges() will check the component for any new rendered views. This is action is needed
    to reference the input.
    */
    this.changeDetector.detectChanges();

    /*
    Set focus on the input. Essentially force focus on the input when edit icon is clicked,that
    way we can detect when focus is lost.
    */
    this.inputTask.nativeElement.focus();
  }

  focusOnInput(){
    //Render input, task is now editable.
    this.renderInputTask = true;
  }

  focusOffInput(){
  //Disable rendering of input.
   this.renderInputTask = false;
  }

  onDone(ref){
    this.task.isDone = !this.task.isDone;
    this.cardBackgroundColorChange();
    this.doneTask.emit(this.task);
  }

  cardBackgroundColorChange(){
    if(this.task.isDone){
      this.cardTaskClasses = this.cardTaskClasses.replace("task","green");
    }else{
      this.cardTaskClasses = this.defaultCardTaskClasses;
    }
  }
}
