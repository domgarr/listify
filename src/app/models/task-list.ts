import {Task} from './task';


export class TaskList {
  taskListId: number;
  userId : number;
  name : string;
  tasks : Task[];

  public constructor( ){
    this.name = "";
  }

  get TaskListId() {
    return this.taskListId;
  }

  get UserId() {
    return this.userId;
  }

  set UserId(userId : number) {
    this.userId = userId;
  }

  get Name() {
    return this.name;
  }

  set Name(name : string) {
    this.name = name;
  }

  get Tasks() : Task[] {
    return this.tasks;
  }

  set Tasks(tasks : Task[]) {
    this.tasks = tasks;
  }


}
