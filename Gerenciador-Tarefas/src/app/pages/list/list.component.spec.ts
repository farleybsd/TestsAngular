import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { of } from 'rxjs';
import { FakeTaskService } from 'src/testing/mocks/fake-tasks.service';
import { ListItemComponent } from './list-item/list-item.component';
import { FakeListItemComponent } from 'src/testing/mocks/fake-list-item';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from 'src/testing/helpers/test-help';
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let taskService: TasksService;
  let testHelper: TestHelper<ListComponent>;
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

    TestBed.overrideComponent(ListComponent, {
      remove: {
        imports: [ListItemComponent],
      },
      add: {
        imports: [FakeListItemComponent],
      },
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    testHelper = new TestHelper(fixture);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TasksService);
  });

  it('Deve Listar As Tarefas', () => {
    (taskService.getAll as jest.Mock).mockReturnValue(
      of([
        { title: 'Item 1', completed: false },
        { title: 'Item 2', completed: false },
        { title: 'Item 3', completed: false },
        { title: 'Item 4', completed: true },
        { title: 'Item 5', completed: true },
        { title: 'Item 6', completed: true },
      ])
    );

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

    //Passando os dados corretos para o input do componente filho
    expect(todoItems[0].componentInstance.task()).toEqual({
      title: 'Item 1',
      completed: false,
    });
    expect(todoItems[1].componentInstance.task()).toEqual({
      title: 'Item 2',
      completed: false,
    });
    expect(todoItems[2].componentInstance.task()).toEqual({
      title: 'Item 3',
      completed: false,
    });

    const CompletedtodoSection = fixture.debugElement.query(
      By.css('[data-testid="Completed-list"]')
    );
    expect(CompletedtodoSection).toBeTruthy();

    const CompletedItems = CompletedtodoSection.queryAll(
      By.css('[data-testid="Completed-list-item"]')
    );
    expect(CompletedItems.length).toBe(3);

    //Passando os dados corretos para o input do componente filho
    expect(CompletedItems[0].componentInstance.task()).toEqual({
      title: 'Item 4',
      completed: true,
    });
    expect(CompletedItems[1].componentInstance.task()).toEqual({
      title: 'Item 5',
      completed: true,
    });
    expect(CompletedItems[2].componentInstance.task()).toEqual({
      title: 'Item 6',
      completed: true,
    });
  });

  describe('Quando A Tarefa Esta Pendente', () => {
    it('Deve Completar Uma Tarefa', () => {

      const fakeTask: Task = { id: '1', title: 'Item 1', completed: false };
      const tasks: Task[] =[fakeTask];
      
      (taskService.getAll as jest.Mock).mockReturnValue(of(tasks));

      const completedTask: Task = { ...fakeTask, completed: true };
      
      (taskService.patch as jest.Mock).mockReturnValue(of(completedTask));

      fixture.detectChanges();

      expect(testHelper.QueryByTestId('Completed-list-item')).toBeNull();

      const todoItemDebugEl = testHelper.QueryByTestId('todo-list-item');

      (todoItemDebugEl.componentInstance as FakeListItemComponent).complete.emit(fakeTask);

      expect(taskService.patch).toHaveBeenCalledWith(fakeTask.id, {completed: true});

      fixture.detectChanges();
      
      expect(testHelper.QueryByTestId('Completed-list-item')).toBeTruthy();
     
    });
  });
});
