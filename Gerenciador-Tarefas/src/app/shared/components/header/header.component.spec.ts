import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [HeaderComponent],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve Renderizar O Titulo Corretamente', () => {
    const h1DebugElemnt = fixture.debugElement.query(By.css('h1'));
    expect(h1DebugElemnt.nativeElement.textContent).toBe('Gerenciador De Tarefa');
  });
  
});
