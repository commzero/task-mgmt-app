import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
    DropdownModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss']
})
export class TasksDashboardComponent implements OnInit {
  tasks: Task[] = TASKS;

  filteredTasks = [...this.tasks]; 
  statusColumns = {
    pending: [] as Task[],
    inProgress: [] as Task[],
    completed: [] as Task[],
  };

  selectedTask: Task | null = null;
  taskDetailVisible: boolean = false;
  priorities = ['High', 'Medium', 'Low'];
  statuses = ['Pending', 'In Progress', 'Completed'];
  assignedUsers = Array.from(new Set(this.tasks.map(task => task.assignedTo)));


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation()?.extras.state;
  
    if (navigation?.['newTask']) {
      this.tasks.push(navigation['newTask']);
    }
  
    if (navigation?.['updatedTask']) {
      const index = this.tasks.findIndex(t => t.id === navigation['updatedTask'].id);
      if (index !== -1) {
        this.tasks[index] = navigation['updatedTask'];
      }
    }
  
    this.updateStatusColumns(this.tasks);
  }

  confirmDelete(task: Task): void {  
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${task.name}</strong>?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tasks = this.tasks.filter(t => t !== task);
        this.updateStatusColumns(this.tasks);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Task deleted successfully!' });
      },

      reject: () => {
        console.log('Deletion cancelled');
      },
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredTasks = this.tasks.filter(task =>
      task.name.toLowerCase().includes(filterValue) ||
      task.description.toLowerCase().includes(filterValue)
    );
  
    this.updateStatusColumns(filteredTasks);
  }

  updateStatusColumns(filteredTasks: Task[]): void {
    this.statusColumns = {
      pending: filteredTasks.filter(task => task.status === 'Pending'),
      inProgress: filteredTasks.filter(task => task.status === 'In Progress'),
      completed: filteredTasks.filter(task => task.status === 'Completed'),
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
      const filteredTasks = this.tasks.filter(task => task.priority === priority);
      this.updateStatusColumns(filteredTasks);
    }
    
    applyFilterByStatus(status: string): void {
      const filteredTasks = this.tasks.filter(task => task.status === status);
      this.updateStatusColumns(filteredTasks);
    }
    
    applyFilterByAssignedUser(assignedUser: string): void {
      const filteredTasks = this.tasks.filter(task => task.assignedTo === assignedUser);
      this.updateStatusColumns(filteredTasks);
    }

}
