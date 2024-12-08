import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {
  @Input() visible: boolean = false; // Controls the dialog's visibility
  @Input() taskName: string = ''; // The name of the task to delete
  @Output() onConfirm = new EventEmitter<void>(); // Event for confirmation
  @Output() onCancel = new EventEmitter<void>(); // Event for cancellation

  confirm(): void {
    this.onConfirm.emit(); // Emit confirmation event
  }

  cancel(): void {
    this.onCancel.emit(); // Emit cancellation event
  }
}
