import { Component, Input } from '@angular/core';
import { Task } from './Task';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let task of tasks">
        <button
          [class.line-through]="task.done"
          (click)="toggleDoneStatus(task, $event)"
        >
          {{ task.name }}
        </button>
      </li>
      <!-- <li>
        <button
          [class.line-through]="tasks[1].done"
          (click)="toggleDoneStatus(tasks[1], $event)"
        >
          {{ tasks[1].name }}
        </button>
      </li> -->
    </ul>
  `,
  styles: `
    input:focus + button {
      @apply text-orange-400;
    }
  `,
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  toggleDoneStatus(task: Task, event: Event) {
    console.log(event);
    task.done = !task.done;
  }
}
