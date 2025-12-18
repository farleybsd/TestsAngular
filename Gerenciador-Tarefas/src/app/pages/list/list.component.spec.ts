import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve Listar As Tarefas', () => {
    
    const todoSection = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoSection).toBeTruthy();
    
    const todoItems =todoSection.queryAll(By.css('[data-testid="todo-list-item"]'));
    expect(todoItems.length).toBe(3);


    const CompletedtodoSection = fixture.debugElement.query(By.css('[data-testid="Completed-list"]'));
    expect(CompletedtodoSection).toBeTruthy();
    
    const CompletedItems =CompletedtodoSection.queryAll(By.css('[data-testid="Completed-list-item"]'));
    expect(CompletedItems.length).toBe(3);

  });
});
