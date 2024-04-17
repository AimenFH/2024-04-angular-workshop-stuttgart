import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { concatMap, map, mergeMap, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  bs = inject(BookStoreService);

  book$ = toSignal(
    inject(ActivatedRoute).paramMap.pipe(
      map(paraMap => paraMap.get('isbn') || ''),
      concatMap(isbn => this.bs.getSingleBook(isbn))
    )
  )

}
