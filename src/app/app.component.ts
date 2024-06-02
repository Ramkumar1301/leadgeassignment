import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from 'src/task';
import { TaskService } from './task.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Task Management ';
  tasks: Task[] = [];
  taskForm: FormGroup;
  selectedTask: Task | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: '',
      description: '',
      date: '',
      isRecurring: false,
      recurrenceInterval: '',
    });
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onSubmit(): void {
    if (this.selectedTask) {
      const updatedTask = { ...this.taskForm.value, id: this.selectedTask.id };
      this.taskService.updateTask(updatedTask);
      this.selectedTask = null;
    } else {
      this.taskService.addTask(this.taskForm.value);
    }
    this.taskForm.reset();
    this.tasks = this.taskService.getTasks();
  }

  onEdit(task: Task): void {
    this.selectedTask = task;
    this.taskForm.patchValue(task);
  }

  onDelete(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
  }

  onCancelEdit(): void {
    this.selectedTask = null;
    this.taskForm.reset();
  }
}