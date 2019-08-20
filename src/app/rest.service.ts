import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Hamburguer } from './model/hamburguer.model';
import { Ingredients } from './model/ingredients.model';
import { Promotion } from './model/promotion.model';
import { Order } from './model/order.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {  
  }

  private extractData(res: Response) {
    return res || { };
  }

  getHamburguers(): Observable<Hamburguer[]> {
    return this.http.get(this.apiURL + '/hamburguer/findAll').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getHamburguers'))
    );
  }

  getIngredients(): Observable<Ingredients[]> {
    return this.http.get(this.apiURL + '/ingredient/findAll').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getIngredients'))
    );
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(this.apiURL + '/promotion/findAll').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getPromotions'))
    );
  }

  saveOrder (order): Observable<any> {
      return this.http.post<any>(this.apiURL + '/order/save', JSON.stringify(order), this.httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError<any>('saveOrder'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
