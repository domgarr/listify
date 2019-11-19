export class Task {
  id : number;
  listId: number;
  description: string;
  isDone :boolean;

  constructor() {
        this.description = "";
    }

  get Id() : number {
    return this.id;
  }

  set Id(id : number){
    this.id = id;
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
