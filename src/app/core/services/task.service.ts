import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TASKS } from '../utilities/tasks.model';
import { Task } from '../../shared/models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.tasksSubject.next([...TASKS]);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next([...tasks, task]);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.value.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    this.tasksSubject.next(tasks);
  }

  deleteTask(taskId: number): void {
    const tasks = this.tasksSubject.value.filter((task) => task.id !== taskId);
    this.tasksSubject.next(tasks);
  }
}
