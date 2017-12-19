import { Component } from '@angular/core';
import {BookService} from './book.service';

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
}
