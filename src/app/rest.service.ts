import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  apiURL = 'http://localhost:3000';

  constructor(private http: Http) {  
  }

  private extractData(res: Response) {
    return res.json() || { };
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiURL + '/hamburguer/findAll').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
