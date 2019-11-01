import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Remember to add the HttpClientModule in imports to make it accessible everywhere.
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodolistComponent } from './todolist/todolist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NewTaskComponent } from './new-task/new-task.component';




@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodolistComponent,
    NewTaskComponent
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
