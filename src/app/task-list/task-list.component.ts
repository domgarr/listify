import { Component, OnInit,OnDestroy, Input, ElementRef, ChangeDetectorRef,HostListener, ViewChild, Output, EventEmitter} from '@angular/core';

import {Task} from '../models/task';
import {TaskList} from '../models/task-list';
import {TaskService} from '../task.service';
import {TaskListService} from '../task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

   editingTaskListName = false; //Controls if input element for editing TaskListName is rendered or not.

   isDoneBatch : Task[]  = []; //Used for holding Task models which were clicked denoting is_done as true or complete.

    @Input() taskList : TaskList; //The taskList is a @Input because the parent component feeds it a  taskList object
    /*
      Note the @ViewChild annotation. This is get a reference to the Input which is not rendered on OnInit
    */
    @ViewChild('inputTaskListName', {static:false}) inputTaskListName : ElementRef;
    @Output() deleteTaskList = new EventEmitter<any>(); //An event consumed by tasklist container componenet.

/*
  Upon instantiation Angular will use its DI system to set taskservice to a singleton instance of taskservice.
*/
  constructor(private ref : ChangeDetectorRef, private taskService: TaskService, private taskListService: TaskListService) {
   }
/*
  Upon refreshing or closing the browser make a request to update all tasks that were completed.
  @HostListener is used here as it references to this component, thus this can be used to reference
  the array isDoneBatch. I decided to update isDone via batch incase a user spams clicks a task.
*/
   @HostListener('window:beforeunload')
   persistIsDoneChanges(){
     this.taskService.batchUpdateTaskDone(this.isDoneBatch).subscribe(resp => {} );
   }

  ngOnInit() {
    //Upon angular initiating
    this.getTasks(this.taskList.listId);
  }

  /*
    Get all tasks associated with this tasklist.
  */
  getTasks(listTaskId) : void {
    //http get request to fetch all tasks
     this.taskService.getTasks(listTaskId).subscribe(tasks => this.taskList.tasks = tasks);
  }

  /* Initalize an array if there are no tasks associated with this tasklist.
    add newly added tasklist to the array. Note that the task component will emit an
    event when a new task is added to the db.
  */
  onNewTaskAdded(task : Task){
    //If there is no tasks for this tasklist found in the db we have to init the array before pushing.
    if(!this.taskList.tasks){
      this.taskList.tasks = [];
    }
    this.taskList.tasks.push(task);
  }

  onEditedTask(editedtask: Task){
    //Find the task object and save it as a reference
    let existingtask = this.taskList.tasks.find(task => task.id === editedtask.id );
    //Use the reference to find the index.
    let index = this.taskList.tasks.indexOf(existingtask);
    //Used the mutated task to replace the existing task.
    this.taskList.tasks[index] = editedtask;
  }

  onDeleteTask(taskToDelete : Task){
    //Extract this code into a function
    let existingtask = this.taskList.tasks.find(task => task.id === taskToDelete.id );
    let index = this.taskList.tasks.indexOf(existingtask);
    //splice will remove 1 (second param) object at the given index.
    this.taskList.tasks.splice(index, 1);
  }

  renameTaskList(newTaskListName : string){
    /*
      ... is called the spread operator
      It will copy all elements in an existing object into a new object as done below.
      Making the spread operator a great option for cloning objects.

      I make a new taskList object because I don't want to mutate the object
      until the db responds with a 200 OK.
    */
    let reqTaskList = {...this.taskList};
    reqTaskList.name = newTaskListName;
    /*
      Append an empty array of tasks since it isn't needed for editing a task's name.
      The endpoint expects a TaskList model, but we should only have to pass ID and new Tasklist Name to get the job done.
    */
    reqTaskList.tasks = [];
    //Wait for a status 200 OK response from the server until changing the tasklist name
    this.taskListService.updateTaskListName(reqTaskList).subscribe((response) =>{
      if(response.status === 200){
        this.taskList.name = newTaskListName ;
      }
    });
    this.editingTaskListName = false; //By setting this value to false *ngIf on the input element becomes false and is not rendered anymore.
  }

  onEditTaskListName(){
    this.editingTaskListName = true; //Used on input component, sets *ngIf to true, rendering the input element.
    this.ref.detectChanges(); //Force component to update view. I'm forced to use this because mat-input from angular materials is possibly bugged.
    this.inputTaskListName.nativeElement.focus(); //Force focus onto input. This way we have a reliable way of hiding the input agian once the user loses focus.
  }

  focusOffEditTaskListName(){
    this.editingTaskListName = false;
  }

  //TODO: Add a confirmation before deleting the entire list.
  //Delete the entire TaskList once the server responds with an OK status.
  onDeleteTaskList(){
    this.taskListService.deleteTaskList(this.taskList.listId).subscribe( response => {
      if(response.status === 200){
        this.deleteTaskList.emit(this.taskList.listId);
      }
    });
  }

  /* When a Task is complete, that is when the user clicks on it and renders green
  the Task is pushed to an array. When the user refreshes or exits the application
  a batch request will be made to the server updating the is_done field for all tasks
  mutated. I believe this is the correct decision as a user could simply spam click the
  task. This is a more efficient solution. */

  onDoneTask(task : Task){
    //Check if task is already added to the batch array.
    if(this.checkIfCompletedTaskIsInBatchArray(task.id)){
      return;
    }else{
      this.isDoneBatch.push(task);
    }
  }

  //Returns an object if a task exists in the batch array else returns undefined.
  checkIfCompletedTaskIsInBatchArray(id){
    let existingTask = this.isDoneBatch.find(task => id === task.id);
    return existingTask;
  }
}
