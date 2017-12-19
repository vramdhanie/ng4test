import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface Author {
  firstname: String;
  lastName: String;
}

export interface Book {
  title: String;
  authors: [Author];
}

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  fetchBooks(): Observable<Book> {
    const params = new HttpParams()
      .set('id', '234')
      .set('populateAuthor', 'true');

    return this
      .http
      .get<Book>('/assets/data/books.json', {
        params: params
      });
  }

}
