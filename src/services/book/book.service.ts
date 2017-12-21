import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

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
    // this constructs a query string
    const params = new HttpParams()
      .set('id', '234')
      .set('populateAuthor', 'true');

    // allow for customizing teh HttpHeaders sent with the request
    const headers = new HttpHeaders()
      .set('app-language', 'en');

    // fail half of the time
    const url = Math.random() < 0.5 ? '/assets/data/books_error.json' : '/assets/data/books.json';

    return this
      .http
      .get<Book>(url, {
        params: params,
        headers: headers
      })
      // .retry(3) // use rxjs retry operator to automatically retry the call up to 3 times on failure.
      .retryWhen(err => {
        let retries = 3;
        return err
          .delay(1000) // wait 1 second
          .flatMap( err => {
            if (retries-- > 0) {
              // still more tries
              return Observable.of(err);
            }else{
              // fail because all tries are done
              return Observable.throw(err);
            }
          });
      }); // alternatively use retryWhen to introduce a delay
  }

  createBook(): Observable<Book> {
    const book = {
      title: 'Firestarter',
      authors: [
        {
          firstName: 'Stephen',
          lastName: 'King'
        }
      ]
    };
    console.log('In the createBook method');
     return this
       .http
       .post<Book>('/assets/data/books.json', book);
  }

}
