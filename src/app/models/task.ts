export class Task {
  userId : number;
  listId: number;
  description: string;
  isDone :boolean;
  order : number;

  constructor() {
        this.description = "";
    }
}
