import { Component } from '@angular/core';
import {BookService} from '../services/book/book.service';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUploadService} from '../services/fileUpload/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books$;
  message;
  progress;
  constructor(
    private bookService: BookService,
    private fileService: FileUploadService) {}

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

  uploadFile(fileUpload){
    const formData = new FormData();
    formData.append('image', fileUpload.files[0], 'image.jpg');
    this
      .fileService
      .fileUpload(formData)
      .subscribe( res => {
        if ( res.type === HttpEventType.UploadProgress){
          const percentage = Math.round(100 * res.loaded / res.total);
          this.progress = `${percentage}% uploaded`;
        }else if( res instanceof HttpResponse) {
          this.progress = 'DONE';
        }
      });
  }
}
