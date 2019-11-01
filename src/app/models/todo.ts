export class Todo {
  userId : number;
  listId: number;
  description: string;
  isDone :boolean;

  constructor() {
        this.description = "";
    }
}
