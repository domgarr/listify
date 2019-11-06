export class Task {
  taskId : number;
  listId: number;
  description: string;
  isDone :boolean;

  constructor() {
        this.description = "";
    }

  get TaskId() : number {
    return this.taskId;
  }

  set TaskId(taskId : number){
    this.taskId = taskId;
  }

  get ListId() : number {
    return this.listId;
  }

  set ListId(listId : number){
    this.listId = listId;
  }

  get Description() : string {
    return this.description;
  }

  set Description(description : string){
    this.description = description;
  }

  get IsDone() : boolean {
    return this.isDone;
  }

  set IsDone(isDone : boolean){
    this.isDone = isDone;
  }

}
