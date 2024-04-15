import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Book } from '../shared/book';
import { DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, UpperCasePipe, DatePipe, BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  jetzt = new Date();

  br = inject(BookRatingService);

  constructor() {
    // setTimeout(() => this.books = [], 3000)
  }

  books: Book[] = [{
    isbn: '000',
    title: 'Angular',
    description: 'Tolles Buch!',
    rating: 5
  }, {
    isbn: '111',
    title: 'AngularJS',
    description: 'Altes Buch',
    rating: 3
  }, {
    isbn: '222',
    title: 'jQuery',
    description: 'Sehr, sehr altes Buch',
    rating: 1
  }];


  doRateUp(book: Book) {
    const ratedBook = this.br.rateUp(book);
    // const ratedBook = {
    //   ...book,
    //   rating: Math.min(book.rating + 1, 5)
    // };
    this.updateAndSortBooks(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.br.rateDown(book);
    this.updateAndSortBooks(ratedBook);
  }

  updateAndSortBooks(ratedBook: Book) {

    return this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating)
  }
}
