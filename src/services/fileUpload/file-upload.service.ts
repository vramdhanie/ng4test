import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  fileUpload(data): Observable<HttpEvent<Object>>{
    const req = new HttpRequest(
      'POST',
      'http://localhost:8400/api/v1/files/upload',
      data,
      { reportProgress: true }
    );

    return this.http.request(req);

  }

}
