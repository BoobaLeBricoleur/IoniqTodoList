// src/app/task-list/task-list.component.ts
import { Component } from '@angular/core';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  filter: string = 'all';
  newTaskName: string = '';
  newTaskContent: string = '';
  tasks: Task[];
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
    this.applyFilter(); // Appliquez le filtre initial
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'completed':
        this.filteredTasks = this.tasks.filter(task => task.isComplete);
        break;
      case 'pending':
        this.filteredTasks = this.tasks.filter(task => !task.isComplete);
        break;
      default:
        this.filteredTasks = [...this.tasks];
    }
  }


  addTask(): void {
    if (this.newTaskName) {
      const newTask: Task = {
        id: 0,
        name: this.newTaskName,
        content: this.newTaskContent,
        isComplete: false,
        editing: false,
      };

      this.taskService.addTask(newTask);
      this.newTaskName = '';
      this.newTaskContent = '';
    }
    this.applyFilter();
  }

  markTaskAsComplete(task: Task): void {
    task.isComplete = !task.isComplete;
    this.applyFilter();
  }

  removeTask(task: Task): void {
    this.taskService.removeTask(task);
    this.applyFilter();
  }

  enableEditing(task: Task): void {
    task.editing = true;
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task);
    task.editing = false;
    this.applyFilter();
  }

  cancelEditing(task: Task): void {
    task.editing = false;
  }

}
