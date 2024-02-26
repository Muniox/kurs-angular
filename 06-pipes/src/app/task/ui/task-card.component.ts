import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskType } from '../model/task.type';
import { RemoveItemButtonComponent } from '@ui/remove-item-button.component';
import { AutosizeTextareaComponent } from '@ui/autosize-textarea.component';
import { NgIconComponent } from '@ng-icons/core';
import { NgIf } from '@angular/common';
import { TaskUpdatePayload } from '../data-access/tasks.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
    NgIconComponent,
    NgIf,
  ],
  template: `
    <div
      class="rounded-md shadow-md p-4 block"
      [class.bg-green-300]="task.done"
    >
      <button
        class="w-full"
        (click)="handleSingleClick()"
        (dblclick)="switchToEditMode()"
      >
        <header class="flex justify-end">
          <app-remove-item-button (confirm)="delete.emit()" />
        </header>
        <section class="text-left">
          <app-autosize-textarea
            *ngIf="editMode; else previewModeTemplate"
            (keyup.escape)="editMode = false"
            (submitText)="updateTaskName($event)"
            [value]="task.name"
          />

          <ng-template #previewModeTemplate>
            <span [class.line-through]="task.done">
              {{ task.name }}
            </span>
          </ng-template>
        </section>
        <footer class=" pt-2 flex items-center justify-end">
          <ng-icon name="featherCalendar" class="text-sm" />
        </footer>
      </button>
    </div>
  `,
  styles: ``,
})
export class TaskCardComponent {
  @Input({ required: true }) task!: TaskType;

  @Output() update = new EventEmitter<TaskUpdatePayload>();

  @Output() delete = new EventEmitter<void>();

  removeMode = false;
  editMode = false;

  isSingleClick = true;

  updateTaskName(updatedName: string) {
    this.update.emit({ name: updatedName });

    this.editMode = false;
  }

  handleSingleClick() {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.update.emit({ done: !this.task.done });
      }
    }, 150);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }
}
