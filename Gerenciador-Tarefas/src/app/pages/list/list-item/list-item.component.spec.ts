import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from 'src/testing/helpers/test-help';
import { Component } from '@angular/core';

async function setup(fakeTask: Task) {
  @Component({
    standalone: true,
    imports: [ListItemComponent],
    template: `<app-list-item
      [task]="task"
      (complete)="onCompleteTask($event)"
    ></app-list-item>`,
  })
  class HostComponent {
    task = fakeTask;
    onCompleteTask() {}
  }

  await TestBed.configureTestingModule({
    imports: [HostComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(HostComponent);
  const testHelper = new TestHelper(fixture);

  return { fixture, testHelper };
}
describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let testHelper: TestHelper<ListItemComponent>;

  it('Deve Renderizar O Titulo Da Tarefa', async() => {

    const fakeTask: Task = {
      id: '1',
      title: 'Nome da Tarefa',
      completed: false,
    };

    const { fixture, testHelper } = await setup(fakeTask); 

    fixture.detectChanges();

    const text = testHelper.getTextContextByTestId('list-item-task-title');

    expect(text).toContain(fakeTask.title);
  });

  it('Deve Emitir Um Evento Ao Completar A Tarefa', async () => {
    const fakeTask: Task = {
      id: '1',
      title: 'Nome da Tarefa',
      completed: false,
    };

    const { fixture, testHelper } = await setup(fakeTask);
    const onCompleteTaskSpy = jest.spyOn(
      fixture.componentInstance,
      'onCompleteTask'
    );

    fixture.detectChanges();

    const CompleteBtnDegugEl = testHelper.QueryByTestId(
      'list-item-complete-action'
    );

    CompleteBtnDegugEl.triggerEventHandler('click', null);

    expect(onCompleteTaskSpy).toHaveBeenCalledWith(fakeTask);
  });
});
