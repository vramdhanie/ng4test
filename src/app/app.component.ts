import { Component } from '@angular/core';
import {BookService} from '../services/book/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books$;

  constructor(private bookService: BookService){}

  fetchBooks() {
    this.books$ = this.bookService.fetchBooks();
  }

  createBook() {
    //it is important to subscribe because this is a post request
    //it will not actually send until you subscribe
    this.bookService.createBook().subscribe();
  }
}
