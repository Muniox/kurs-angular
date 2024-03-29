import { Component, Input } from '@angular/core';
import { TaskType } from '../model/task.type';
import { NgFor, NgIf } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherCalendar } from '@ng-icons/feather-icons';
import { RemoveItemButtonComponent } from '@ui/remove-item-button.component';
import { AutosizeTextareaComponent } from '@ui/autosize-textarea.component';
import { TasksService } from '../data-access/tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  viewProviders: [provideIcons({ featherCalendar })],
  imports: [
    NgFor,
    NgIconComponent,
    NgIf,
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
  ],
  template: `
    <ul>
      <li *ngFor="let task of tasks" class="mb-2">
        <div
          class="rounded-md shadow-md p-4 block"
          [class.bg-green-300]="task.done"
        >
          <button
            class="w-full"
            (click)="handleSingleClick(task)"
            (dblclick)="switchToEditMode()"
          >
            <header class="flex justify-end">
              <app-remove-item-button (confirm)="delete(task.id)" />
            </header>
            <section class="text-left">
              <app-autosize-textarea
                *ngIf="editMode; else previewModeTemplate"
                (keyup.escape)="editMode = false"
                (submitText)="updateTask(task.id, $event)"
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
      </li>
    </ul>
  `,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: TaskType[] = [];

  removeMode = false;
  editMode = false;
  isSingleClick = true;

  constructor(private tasksService: TasksService) {}

  async delete(taskId: number) {
    await this.tasksService.delete(taskId);
  }

  async updateTask(taskId: number, name: string) {
    await this.tasksService.update(taskId, name);
  }

  handleSingleClick(task: TaskType) {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.toggleDoneStatus(task);
      }
    }, 150);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }

  toggleDoneStatus(task: TaskType) {
    task.done = !task.done;
  }
}
