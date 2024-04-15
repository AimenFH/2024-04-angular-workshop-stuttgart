import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';


@Component({
  selector: 'app-book',
  template: '😃',
  standalone: true
})
export class DummyBookComponent {
  @Input() book?: Book;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    // Unit Test (Kind-Komponente ersetzen)
    .overrideComponent(DashboardComponent, {
      remove: { imports: [BookComponent] },
      add: { imports: [DummyBookComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
