import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';


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

    const bookRatingMock = {
      rateUp: (book: Book) => book
      // Absichtlich kein rateDown ("halbes Entchen")
    }

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      }]
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

  it('doRateUp() should call the BookRatingService', () => {

    const rs = TestBed.inject(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    const book = { } as Book;
    component.doRateUp(book);

    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
