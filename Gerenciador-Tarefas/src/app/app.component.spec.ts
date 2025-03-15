import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderComponentMock } from '@testing/mocks/HeaderComponentMock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    // Mock Header
    TestBed.overrideComponent(AppComponent, {
      remove: {
        imports: [HeaderComponent],
      },
      add: {
        imports: [HeaderComponentMock],
      },
    });

  });

  it('deve renderizar o header', () => {
    const fixture = TestBed.createComponent(AppComponent)
    //const text = header.query(By.css('h1')).nativeElement.textContent;
    //expect(text).toContain('Gerenciador De Tarefa');

    const header = fixture.debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
  })
  
  it('deve renderizar o router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const routeroutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routeroutlet).toBeTruthy();
  })

});
