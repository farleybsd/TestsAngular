import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Task } from '../../interfaces/task.interface';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getAll() deve retornar uma lista de tarefas', fakeAsync(() => {
    let result: Task[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    const request = httpTestingController.expectOne('/api/tasks');

    const fakeTasks: Task[] = [
      { id: '1', title: 'Item 1', completed: false },
      { id: '2', title: 'Item 2', completed: false },
      { id: '3', title: 'Item 3', completed: false },
      { id: '4', title: 'Item 4', completed: true },
      { id: '5', title: 'Item 5', completed: true },
      { id: '6', title: 'Item 6', completed: true },
    ];

    request.flush(fakeTasks); // Simula a resposta da requisição HTTP

    tick(); // Simula a passagem do tempo para o delay

    expect(result).toEqual([
      { id: '1', title: 'Item 1', completed: false },
      { id: '2', title: 'Item 2', completed: false },
      { id: '3', title: 'Item 3', completed: false },
      { id: '4', title: 'Item 4', completed: true },
      { id: '5', title: 'Item 5', completed: true },
      { id: '6', title: 'Item 6', completed: true },
    ]);
  }));

  it('path() deve atualizar uma tarefa', fakeAsync(() => {
    const fakeTask: Task = { id: '1', title: 'Item 1', completed: false };

    let result: Task | null = null;

    service.patch(fakeTask.id, { completed: true }).subscribe((response) => {
      result = response;
    });

    const request = httpTestingController.expectOne((req) => {
      return req.method === 'PATCH' && req.url === '/api/tasks/1';
    });

    const fakeRespose: Task = { ...fakeTask, completed: true };

    request.flush(fakeRespose); // Simula a resposta da requisição HTTP

    tick(); // Simula a passagem do tempo para o delay
    expect(result).toEqual(fakeRespose);
  }));
});
