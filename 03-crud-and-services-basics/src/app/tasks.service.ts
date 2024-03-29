import { Injectable } from '@angular/core';
import { Task } from './Task';
import { ListFetchingError } from './list-state.type';
import { wait } from './wait';

// const URL = 'http://localhost:3000';

// export async function getTasks() {
//   await wait();
//   return fetch(`${URL}/tasks`).then<Task[] | ListFetchingError>((response) => {
//     if (response.ok) {
//       return response.json();
//     }

//     return { status: response.status, message: response.statusText };
//   });
// }

// export async function addTasks(name: string) {
//   await wait();
//   return fetch(`${URL}/tasks`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       createdAt: new Date().getTime(),
//       name,
//       done: false,
//     } as Task),
//   });
// }

// export const tasksService = {
//   getTasks,
//   addTasks,
// };

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly URL = 'http://localhost:3000';

  async delete(taskId: number) {
    fetch(`${this.URL}/tasks/${taskId}`, {
      method: 'DELETE',
    }).then<Error | undefined>((response) => {
      if (!response.ok) {
        return new Error('Cant add Task');
      }
      return response.json();
    });
  }

  async update(taskId: number, name: string) {
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    }).then<Task | Error>((response) => {
      if (!response.ok) {
        return new Error('Cant update Task');
      }
      return response.json();
    });
  }

  async getAll() {
    await wait();
    return fetch(`${this.URL}/tasks`).then<Task[] | ListFetchingError>(
      (response) => {
        if (response.ok) {
          return response.json();
        }

        return { status: response.status, message: response.statusText };
      },
    );
  }

  async add(name: string) {
    await wait();
    return fetch(`${this.URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdAt: new Date().getTime(),
        name,
        done: false,
      } as Task),
    }).then<Task | Error>((response) => {
      if (!response.ok) {
        return new Error('Cant add Task');
      }
      return response.json();
    });
  }
}
