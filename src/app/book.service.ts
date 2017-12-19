import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  fetchBooks(): Observable<Object> {
    return this
      .http
      .get('/assets/data/books.json');
  }

}
