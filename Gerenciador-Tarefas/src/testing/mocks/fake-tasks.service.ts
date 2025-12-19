import { HttpClient } from "@angular/common/http";
import { TasksService } from "src/app/shared/services/tasks/tasks.service";

export class FakeTaskService implements TasksService {
  httpCliente!: HttpClient;
  getAll = jest.fn();
}