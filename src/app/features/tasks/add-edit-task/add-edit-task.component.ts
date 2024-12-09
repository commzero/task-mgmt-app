import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../shared/models/tasks.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    CardModule,
  ],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  task: Task | null = null;
  priorityOptions = ['Low', 'Medium', 'High'];
  statusOptions = ['Pending', 'In Progress', 'Completed'];
  userOptions = ['User1', 'User2', 'User3'];
  minDate: Date = new Date();
  users: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private taskService: TaskService,
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(200)],
      priority: [null, Validators.required],
      status: [null, Validators.required],
      assignedTo: [null, Validators.required],
      dueDate: [null, Validators.required],
    });
    this.loadUsers();
    this.task =
      this.router.getCurrentNavigation()?.extras.state?.['task'] || null;
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit(): void {
    if (this.task) {
      // Edit existing task
      const updatedTask: Task = { ...this.taskForm.value, id: this.task.id };
      this.taskService.updateTask(updatedTask);
      this.messageService.add({
        severity: 'success',
        summary: 'Task Updated',
        detail: `Task "${this.taskForm.value.name}" was updated successfully!`,
      });
    } else {
      // Add new task
      const newTask: Task = { ...this.taskForm.value, id: Date.now() };
      this.taskService.addTask(newTask);
      this.messageService.add({
        severity: 'success',
        summary: 'Task Added',
        detail: `Task "${this.taskForm.value.name}" was added successfully!`,
      });
    }
    this.router.navigate(['/tasks']);
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      },
    );
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
    this.messageService.add({
      severity: 'info',
      summary: 'Operation Cancelled',
      detail: 'Operation was cancelled by the user.',
    });
  }
}
