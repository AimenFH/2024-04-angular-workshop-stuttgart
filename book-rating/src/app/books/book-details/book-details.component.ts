import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, concatMap, map, mergeMap, of, retry, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';


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
      switchMap(isbn => this.bs.getSingleBook(isbn).pipe(
        retry({
          count: 2,
          delay: 500
        }),
        catchError((err: HttpErrorResponse) => of({
          isbn: '000',
          title: err.message
        }))
      ))
    )
  )

}
