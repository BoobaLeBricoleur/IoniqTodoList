// src/app/services/task.service.ts
import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  name: string;
  content: string;
  isComplete: boolean;
  editing?: boolean; 
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private currentId = 0;
  tasks: Task[] = [];

  constructor() { }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = ++this.currentId;
    task.content = task.content || '';
    this.tasks.push(task);
  }

  removeTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }

}
}