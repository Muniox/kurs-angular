import { Component, Input } from '@angular/core';
import { TaskType } from '../model/task.type';
import { NgFor } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { featherCalendar } from '@ng-icons/feather-icons';
import { TaskUpdatePayload, TasksService } from '../data-access/tasks.service';
import { TaskCardComponent } from './task-card.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  viewProviders: [provideIcons({ featherCalendar })],
  template: `
    <ul>
      <li *ngFor="let task of tasks" class="mb-2">
        <app-task-card
          [task]="task"
          (update)="updateTask(task.id, $event)"
          (delete)="delete(task.id)"
        />
      </li>
    </ul>
  `,
  styles: [],
  imports: [NgFor, TaskCardComponent],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: TaskType[] = [];

  constructor(private tasksService: TasksService) {}

  async delete(taskId: number) {
    await this.tasksService.delete(taskId).then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }
    });
  }

  async updateTask(taskId: number, updatedTask: TaskUpdatePayload) {
    await this.tasksService.update(taskId, updatedTask).then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        this.tasks = this.tasks.map((task) => {
          if (task.id === res.id) {
            return res;
          } else {
            return task;
          }
        });
      }
    });
  }
}
