import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { Task } from '../../../shared/models/tasks.model';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [ButtonModule, DragDropModule, TooltipModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() viewDetails = new EventEmitter<Task>();

  @HostBinding('attr.pDraggable') draggable = true;

  @HostBinding('attr.draggableData') get draggableData(): Task | null {
    return this.task;
  }

  onEdit() {
    if (this.task) {
      this.edit.emit(this.task);
    }
  }

  onDelete() {
    if (this.task) {
      this.delete.emit(this.task);
    }
  }

  onViewDetails() {
    if (this.task) {
      this.viewDetails.emit(this.task);
    }
  }

  isTooltipEnabled(text: string | undefined, maxLength: number): boolean {
    return !!text && text.length > maxLength;
  }
}
