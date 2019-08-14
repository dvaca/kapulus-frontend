import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Impresion } from './impresion';
import { Impresora } from './impresora';
import { VariablesEvento } from './variablesEvento';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ImpresionService {

  private backendUrl = 'http://192.168.0.31:4001';
  //private backendUrl = 'http://169.254.168.35:4000'; //PEER TO PEER
  //private backendUrl = 'http://192.168.0.100:4000'; //CAPULUS
  //private backendUrl = 'https://kapulus-backend.herokuapp.com'; //LOCAL
  //private backendUrl = 'http://192.168.0.102:4000'; //LOCAL
  //private backendUrl = 'http://172.20.10.6:4000'; //INTERNET

  constructor(private http: HttpClient, public config: VariablesEvento) { }

  imprimir(impresion: Impresion): Observable<Impresion> {
    const url = `${this.config.impresoraSeleccionada.ip}/imprimir/${this.config.idevento}/` + impresion.identificacion;    
    return this.http.post<Impresion>(url, impresion, httpOptions).pipe(
      catchError(this.handleError<Impresion>('imprimir'))
    );
  }

  getListaImpresoras(ip: string): Observable<Impresora[]> {
    const url = `${ip}/listaimpresoras/`;
    return this.http.get<Impresora[]>(url)
    .pipe(
      catchError(this.handleError('getListaImpresoras', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error.message); // log to console instead
      console.error(operation);
      alert(error.message);
      alert(operation);
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
