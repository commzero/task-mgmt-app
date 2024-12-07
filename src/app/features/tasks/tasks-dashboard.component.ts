import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
// import { AddEditTaskDialogComponent } from './add-edit-task-dialog.component';
import { Task } from '../../shared/models/tasks.model';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { TASKS } from '../../core/utilities/tasks.model';

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent {
  tasks: Task[] = TASKS;

  filteredTasks = [...this.tasks]; // Initialize filtered tasks

  statusColumns = {
    pending: this.tasks.filter(task => task.status === 'Pending'),
    inProgress: this.tasks.filter(task => task.status === 'In Progress'),
    completed: this.tasks.filter(task => task.status === 'Completed'),
  };

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  // openAddEditTaskDialog(task?: Task) {
  //   const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
  //     width: '500px',
  //     data: task ? { ...task } : null,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (task) {
  //         // Edit existing task
  //         Object.assign(task, result);
  //       } else {
  //         // Add new task
  //         this.tasks.push(result);
  //       }
  //       this.updateStatusColumns();
  //       this.snackBar.open('Task saved successfully!', 'Close', { duration: 3000 });
  //     }
  //   });
  // }

  confirmDelete(task: Task) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { taskName: task.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks = this.tasks.filter(t => t !== task);
        this.updateStatusColumns();
        this.snackBar.open('Task deleted successfully!', 'Close', { duration: 3000 });
      }
    });
  }


  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.name.toLowerCase().includes(filterValue) ||
      task.description.toLowerCase().includes(filterValue)
    );
  }

  updateStatusColumns() {
    this.statusColumns.pending = this.tasks.filter(task => task.status === 'Pending');
    this.statusColumns.inProgress = this.tasks.filter(task => task.status === 'In Progress');
    this.statusColumns.completed = this.tasks.filter(task => task.status === 'Completed');
  }
}
