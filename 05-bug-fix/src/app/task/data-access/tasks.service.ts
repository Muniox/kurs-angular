import { Injectable } from '@angular/core';
import { TaskType } from '../model/task.type';
import { ListFetchingError } from '../../utils/list-state.type';
import { wait } from '../../utils/wait';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly URL = 'http://localhost:3000';

  async delete(taskId: number) {
    return fetch(`${this.URL}/tasks/${taskId}`, {
      method: 'DELETE',
    }).then<Error | undefined>((response) => {
      if (!response.ok) {
        return new Error('Cant add TaskType');
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
    }).then<TaskType | Error>((response) => {
      if (!response.ok) {
        return new Error('Cant update TaskType');
      }
      return response.json();
    });
  }

  async getAll() {
    await wait();
    return fetch(`${this.URL}/tasks`).then<TaskType[] | ListFetchingError>(
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
      } as TaskType),
    }).then<TaskType | Error>((response) => {
      if (!response.ok) {
        return new Error('Cant add TaskType');
      }
      return response.json();
    });
  }
}
