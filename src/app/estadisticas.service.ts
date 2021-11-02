import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesEvento } from './variablesEvento';
import { CampoEvento } from './camposevento';
import { Zona } from './zona';
import { Estadistica } from './estadistica';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EstadisticasService {

  //private backendUrl = 'http://localhost:4000';
  //private backendUrl = 'http://169.254.168.35:4000'; //PEER TO PEER
  //private backendUrl = 'http://192.168.0.100:4000'; //CAPULUS
  private backendUrl = 'https://backend-kapulus.herokuapp.com'; //LOCAL
  //private backendUrl = 'http://192.168.0.102:4000'; //ADRIAN
  //private backendUrl = 'http://192.168.0.7:4000'; //INTERNET
  
  constructor(private http: HttpClient, public config: VariablesEvento) { }

    //#region Estadisticas
    getEstadisticasRegistrados(): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/registrados/${this.config.idevento}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getEstadisticasRegistrados'))
      );
    }
  
    getEstadisticasAsistentes(): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/asistentes/${this.config.idevento}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getEstadisticasAsistentes'))
      );
    }
  
    getEstadisticasActualizados(): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/actualizados/${this.config.idevento}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getEstadisticasActualizados'))
      );
    }
  
    getEstadisticasCertificados(): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/certificados/${this.config.idevento}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getEstadisticasCertificados'))
      );
    }

    getEstadisticasOperacion(): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/operacion/${this.config.idevento}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getEstadisticasOperacion'))
      );
    }

    getTimeLineRegistrados(): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/registradostimeline/${this.config.idevento}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getTimeLineRegistrados'))
      );
    }

    getTimeLineZonas(zona: Zona): Observable<any>{
      const url = `${this.backendUrl}/estadisticas/zonastimeline/${this.config.idevento}/${zona.id}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getTimeLineZonas'))
      );
    }
  
    getEstadisticasCampos(campo: CampoEvento): Observable<any> {
      const url = `${this.backendUrl}/estadisticas/${this.config.idevento}/campos/${campo.id}`;
      return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getEstadisticasCampos'))
      );
    }
  
    //#endregion
	//#region sincronizar
    getEstadisticasLocal(): Observable<Estadistica[]>{
      const url = `${this.backendUrl}/sincronizar/estadisticas/${this.config.idevento}`;
      return this.http.get<Estadistica[]>(url)
      .pipe(
        catchError(this.handleError<Estadistica[]>('getEstadisticasLocal'))
      );
    }
    //#endregion

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
