import { Component } from '@angular/core';
import {BookService} from '../services/book/book.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books$;
  message;
  constructor(private bookService: BookService){}

  fetchBooks() {
    this.bookService
      .fetchBooks()
      .subscribe(
        data => {
          this.message = null;
          this.books$ = data;
      }, (err: HttpErrorResponse) => {
          if ( err instanceof Error) {
            // client side error
            this.message = `An error occured ${err.error.message}`;
          }else {
            // server side error
            this.message = `Backend returned an error with status ${err.status} and body ${err.message}`;
          }
        });
  }

  createBook() {
    // it is important to subscribe because this is a post request
    // it will not actually send until you subscribe
    this.bookService.createBook().subscribe();
  }
}
