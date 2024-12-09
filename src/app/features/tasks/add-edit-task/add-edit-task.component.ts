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
import { TASKS } from '../../../core/utilities/tasks.model';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';

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
      console.log(this.task);
    }
  }

  onSubmit(): void {
    if (this.task) {
      // Edit existing task
      const index = TASKS.findIndex((t) => t.id === this.task?.id);
      if (index !== -1) {
        TASKS[index] = { ...this.taskForm.value, id: this.task.id };
        this.messageService.add({
          severity: 'success',
          summary: 'Task Updated',
          detail: `Task "${this.taskForm.value.name}" was updated successfully!`,
        });
      }
    } else {
      // Add new task
      const newTask: Task = { ...this.taskForm.value, id: Date.now() };
      TASKS.push(newTask);
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
  }
}
