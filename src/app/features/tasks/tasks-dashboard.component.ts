import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Task } from '../../shared/models/tasks.model';
import { TASKS } from '../../core/utilities/tasks.model';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TaskItemComponent } from './task-item/task-item.component';
import { DragDropModule } from 'primeng/dragdrop';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    TaskDetailsComponent,
    ToastModule,
    DropdownModule,
    TaskItemComponent,
    DragDropModule,
    FormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
})
export class TasksDashboardComponent implements OnInit {
  tasks: Task[] = TASKS;
  filteredTasks = [...this.tasks];
  statusColumns: {
    pending: Task[];
    inProgress: Task[];
    completed: Task[];
  } = {
    pending: [],
    inProgress: [],
    completed: [],
  };
  searchValue = '';
  selectedTask: Task | null = null;
  taskDetailVisible: boolean = false;
  priorities = ['High', 'Medium', 'Low'];
  statuses = ['Pending', 'In Progress', 'Completed'];
  assignedUsers = Array.from(
    new Set(this.tasks.map((task) => task.assignedTo)),
  );
  draggedTask: Task | null = null;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation()?.extras.state;

    if (navigation?.['newTask']) {
      this.tasks.push(navigation['newTask']);
    }

    if (navigation?.['updatedTask']) {
      const index = this.tasks.findIndex(
        (t) => t.id === navigation['updatedTask'].id,
      );
      if (index !== -1) {
        this.tasks[index] = navigation['updatedTask'];
      }
    }

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.updateStatusColumns(tasks);
    });
  }

  confirmDelete(task: Task): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${task.name}</strong>?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTask(task.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Task Deleted',
          detail: `Task "${task.name}" deleted successfully!`,
        });
      },

      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
        });
      },
    });
  }

  applyFilter() {
    const filterValue = this.searchValue.toLowerCase();
    const filteredTasks = this.tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(filterValue) ||
        task.description.toLowerCase().includes(filterValue),
    );

    this.updateStatusColumns(filteredTasks);
  }

  updateStatusColumns(filteredTasks: Task[]): void {
    this.statusColumns = {
      pending: filteredTasks.filter((task) => task.status === 'Pending'),
      inProgress: filteredTasks.filter((task) => task.status === 'In Progress'),
      completed: filteredTasks.filter((task) => task.status === 'Completed'),
    };
  }

  viewTaskDetails(task: Task) {
    this.selectedTask = task;
    this.taskDetailVisible = true;
  }

  closeTaskDetails() {
    this.taskDetailVisible = false;
  }

  navigateToAddEditTask(task?: Task): void {
    if (task) {
      this.router.navigate(['/add-edit-task'], { state: { task } });
    } else {
      this.router.navigate(['/add-edit-task']);
    }
  }

  applyFilterByPriority(priority: string): void {
    const filteredTasks = this.tasks.filter(
      (task) => task.priority === priority,
    );
    this.updateStatusColumns(filteredTasks);
  }

  applyFilterByStatus(status: string): void {
    const filteredTasks = this.tasks.filter((task) => task.status === status);
    this.updateStatusColumns(filteredTasks);
  }

  applyFilterByAssignedUser(assignedUser: string): void {
    const filteredTasks = this.tasks.filter(
      (task) => task.assignedTo === assignedUser,
    );
    this.updateStatusColumns(filteredTasks);
  }

  resetFilters(): void {
    this.searchValue = '';
    this.filteredTasks = [...this.tasks];
    this.updateStatusColumns(this.tasks);
  }

  dragStart(task: Task): void {
    this.draggedTask = task;
  }

  dragEnd(): void {
    this.draggedTask = null;
  }

  drop(targetStatus: 'pending' | 'inProgress' | 'completed'): void {
    if (this.draggedTask) {
      const currentStatus = this.normalizeStatus(this.draggedTask.status) as
        | 'pending'
        | 'inProgress'
        | 'completed';

      if (currentStatus !== targetStatus) {
        const draggedTaskIndex = this.statusColumns[currentStatus].findIndex(
          (t) => t.id === this.draggedTask!.id,
        );
        this.statusColumns[currentStatus].splice(draggedTaskIndex, 1);

        this.draggedTask.status = this.denormalizeStatus(targetStatus);
        this.statusColumns[targetStatus].push(this.draggedTask);
      }
      this.draggedTask = null;
    }
  }

  private normalizeStatus(
    status: string,
  ): 'pending' | 'inProgress' | 'completed' {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'In Progress':
        return 'inProgress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  private denormalizeStatus(
    status: 'pending' | 'inProgress' | 'completed',
  ): 'Pending' | 'In Progress' | 'Completed' {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inProgress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }
}
