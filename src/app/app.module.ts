import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Remember to add the HttpClientModule in imports to make it accessible everywhere.
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    NewTaskComponent,
    NewTaskListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
