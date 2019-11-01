import { Component, OnInit, Input,Output, ViewChild, EventEmitter, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
  description : string;
  @ViewChild('inputTask') inputTask;

  constructor() {
  }

  ngOnChanges(chg){
    console.log(chg);
  }

  ngOnInit() {
    this.description = "";
  }

  onKey(value){
    console.log(this.description);
    this.description = value;
  }

  onEnterPressed(value){
    console.log(value);
    //Create new task
    //Set textbox to empty
    this.description = "";
    console.log(this);

      }
}
