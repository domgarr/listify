import {Task} from './task';


export class TaskList {
  private taskListId: number;
  private taskListName : string;
  private tasks : Task[];

  public constructor( ){
    this.taskListName = "";
    this.tasks = null;
  }

  getTaskListName() : string {
    return this.taskListName;
  }

  setTaskListName(taskListName : string) : void {
    this.taskListName = taskListName;
  }

  getTasks() : Task[] {
    return this.tasks;
  }

  setTasks(tasks : Task[]) : void {
    this.tasks = tasks;
  }


}
