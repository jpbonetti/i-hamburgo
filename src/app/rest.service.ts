import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Hamburguer } from './model/hamburguer.model';
import { Ingredients } from './model/ingredients.model';
import { Promotion } from './model/promotion.model';

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

  getHamburguers(): Observable<Hamburguer[]> {
    return this.http.get(this.apiURL + '/hamburguer/findAll').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getIngredients(): Observable<Ingredients[]> {
    return this.http.get(this.apiURL + '/ingredient/findAll').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(this.apiURL + '/promotion/findAll').pipe(
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
