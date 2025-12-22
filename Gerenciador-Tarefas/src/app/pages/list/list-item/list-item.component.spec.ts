import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from 'src/testing/helpers/test-help';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let testHelper: TestHelper<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    testHelper = new TestHelper(fixture);
  });

  it('Deve Renderizar O Titulo Da Tarefa', () => {

    const fakeTask : Task = {
      title: 'Nome da Tarefa',
      completed: false,

    }
      
    fixture.componentRef.setInput('task',fakeTask)
    fixture.detectChanges();
    
    const taskTitleDebugEl = testHelper.QueryByTestId("list-item-task-title");
    const text = testHelper.getTextContextByTestId("list-item-task-title");

    expect(text).toBe(fakeTask.title);

  });
});
