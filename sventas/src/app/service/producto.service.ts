import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../shared/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }


  create(data: any): Observable<any> {
    return this.http.post<any>(`${environment.API_KEY}/producto`, data).pipe(
      map((userResponse:any) => {
        return userResponse;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }

   getProducto(): Observable<any> {
    return this.http.get<any>(`${environment.API_KEY}/producto/listaproducto`).pipe(
      map((data:any) => {
        return data;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }

  getProductoByID(id:number): Observable<any> {
    return this.http.get<any>(`${environment.API_KEY}/producto/${id}`).pipe(
      map((data:any) => {
        return data;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }

  pachtProducto(body:any, id:number): Observable<any> {
    return this.http.patch<any>(`${environment.API_KEY}/producto/${id}`,body).pipe(
      map((data:any) => {
        return data;
      }),
      catchError((err) => this.handlerError(err.error))
    );
  }
  private handlerError(error: Error): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(()=> errorMessage);
  }
}
