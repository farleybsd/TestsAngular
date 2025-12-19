import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { of } from 'rxjs';
import { FakeTaskService } from 'src/testing/mocks/fake-tasks.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let taskService: TasksService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        {
          provide: TasksService,
          useClass: FakeTaskService,
        },
      ],
    });

    await TestBed.compileComponents();

    taskService = TestBed.inject(TasksService);
  });

  it('Deve Listar As Tarefas', () => {
    
    (taskService.getAll as jest.Mock).mockReturnValue(of([
      { title: 'Item 1', completed: false },
      { title: 'Item 2', completed: false },
      { title: 'Item 3', completed: false },
      { title: 'Item 4', completed: true },
      { title: 'Item 5', completed: true },
      { title: 'Item 6', completed: true },
    ]));

    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();

    const todoSection = fixture.debugElement.query(
      By.css('[data-testid="todo-list"]')
    );
    expect(todoSection).toBeTruthy();

    const todoItems = todoSection.queryAll(
      By.css('[data-testid="todo-list-item"]')
    );
    expect(todoItems.length).toBe(3);

    const CompletedtodoSection = fixture.debugElement.query(
      By.css('[data-testid="Completed-list"]')
    );
    expect(CompletedtodoSection).toBeTruthy();

    const CompletedItems = CompletedtodoSection.queryAll(
      By.css('[data-testid="Completed-list-item"]')
    );
    expect(CompletedItems.length).toBe(3);
  });
});
