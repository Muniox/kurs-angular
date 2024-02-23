import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListPageComponent } from './task-list.page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListPageComponent],
  template: `
    <h1 class="text-orange-500 bg-black py-4 text-xl text-center mb-4">
      Another boring todolist
    </h1>
    <main class="grid place-items-center pt-4">
      <app-task-list-page />
    </main>
    <router-outlet />
  `,
})
export class AppComponent {}
