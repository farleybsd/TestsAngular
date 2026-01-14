import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  QueryByTestId(testId: string) {
    return this.fixture.debugElement.query(
      By.css(`[data-testid="${testId}"]`)
    );
  }

  getTextContextByTestId(testId: string) {
    return this.QueryByTestId(testId).nativeElement.textContent.trim();
  }
  
}
