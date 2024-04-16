import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

  @Output()
  create = new EventEmitter<Book>();

  bookForm = new FormGroup({

    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    description: new FormControl('', {
      nonNullable: true
    })
  });

  c = this.bookForm.controls;

  isInvalid(control: FormControl) {
    return control.touched && control.invalid;
  }

  hasError(control: FormControl, errorCode: string) {
    return control.touched && control.hasError(errorCode);
  }

  // TODO: hasError(control: FormControl, errorCode: string)
  // zB. hasError(c.isbn, 'minlength')

  submitForm() {

    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      rating: 1
    }

    this.create.emit(newBook);
    this.bookForm.reset();
  }
}
