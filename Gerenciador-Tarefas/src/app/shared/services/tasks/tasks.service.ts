import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  httpCliente = inject(HttpClient)

  getAll() : Observable<Task[]> {
    return this.httpCliente.get<Task[]>('/api/tasks');
  }
  patch(id:string,payload:Partial<Task>) : Observable<Task> {
    return this.httpCliente.patch<Task>(`/api/tasks/${id}`, payload);
  }
  
}
