import { Injectable } from '@angular/core';
import { Task } from 'src/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;
  constructor() { }
  getTasks(): Task[]{
    return this.tasks;
  }
  addTask(task:Task):void
{
  task.id = this.nextId++;
  this.tasks.push(task)
}
updateTask(task: Task): void {
  const index = this.tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    this.tasks[index] = task;
  }
}

deleteTask(taskId: number): void {
  this.tasks = this.tasks.filter((task) => task.id !== taskId);
}


}
