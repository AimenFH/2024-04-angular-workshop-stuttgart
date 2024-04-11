import { Component } from '@angular/core';
import { Book } from '../shared/book';
import { DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, UpperCasePipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  jetzt = new Date();

  book: Book[] = [{
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

}