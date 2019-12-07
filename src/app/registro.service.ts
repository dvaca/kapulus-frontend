import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asistente } from "./asistente";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AtributoAsistente } from './atributosasistente';
import { CampoEvento } from './camposevento';
import { Zona } from './zona';
import { AsistenciaZona } from './asistenciazona';
import { ConfiguracionEvento } from './configuracionEvento';
import { VariablesEvento } from './variablesEvento';
import { Impresora } from './impresora';
import { Correo } from './correo';
import { Usuario } from './usuario';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RegistroService {
  
  private backendUrl = environment.URLBack;
  
  constructor(private http: HttpClient, public config: VariablesEvento) { }

  /*
  getAsistentesMock(criterio: string): Asistente[] {
    criterio = criterio.toUpperCase();
    let asistentesRes: Asistente[];
    asistentesRes = ASISTENTES.filter(x => x.identificacion.toString().toUpperCase().indexOf(criterio) >= 0);
    return asistentesRes;
  }

  guardarAsistenteMock(asistente){
    let asistenteExistente: Asistente;
    let indice: number;
    if(ASISTENTES.filter(x => x.identificacion == asistente.documento).length == 0){
      ASISTENTES.push(asistente);
    }else{
      asistenteExistente = ASISTENTES.filter(x => x.identificacion == asistente.documento)[0];
      indice = ASISTENTES.indexOf(asistenteExistente);
      ASISTENTES[indice] = asistente;
    }
  }
  */

  getCamposEvento(): Observable<CampoEvento[]>{
    const url = `${this.backendUrl}/camposevento/${this.config.idevento}`;
    return this.http.get<CampoEvento[]>(url)
    .pipe(
      catchError(this.handleError('getCamposEvento', []))
    );
  }

  getCamposEventoWeb(): Observable<CampoEvento[]>{
    const url = `${this.backendUrl}/camposeventoweb/${this.config.idevento}`;
    return this.http.get<CampoEvento[]>(url)
    .pipe(
      catchError(this.handleError('getCamposEventoWeb', []))
    );
  }

  getZonas(): Observable<Zona[]>{
    const url = `${this.backendUrl}/zonas/${this.config.idevento}`;
    return this.http.get<Zona[]>(url)
    .pipe(
      catchError(this.handleError('getZonas', []))
    );
  }

  getImpresoras(): Observable<Impresora[]> {
    const url = `${this.backendUrl}/impresoras/${this.config.idevento}`;
    return this.http.get<Impresora[]>(url)
    .pipe(
      catchError(this.handleError('getImpresoras', []))
    );
  }
  
  getAsistentes(criterio: string): Observable<Asistente[]> {
    const url = `${this.backendUrl}/asistente/${this.config.idevento}/` + criterio;
    return this.http.get<Asistente[]>(url)
    .pipe(
      catchError(this.handleError('getAsistentes', []))
    );
  }
  
  getAsistenteImpresion(identificacion: number): Observable<Asistente> {
    const url = `${this.backendUrl}/asistente/${this.config.idevento}/impresion/` + identificacion;    
    return this.http.get<Asistente>(url).pipe(
      catchError(this.handleError<Asistente>('getAsistenteImpresion'))
    );
  }

  getAsistenteControlAcceso(identificacion: string): Observable<Asistente> {
    const url = `${this.backendUrl}/asistente/${this.config.idevento}/controlacceso/` + identificacion;    
    return this.http.get<Asistente>(url).pipe(
      catchError(this.handleError<Asistente>('getAsistenteControlAcceso'))
    );
  }
  
    getAsistenteOnline(identificacion: number): Observable<Asistente> {
    const url = `${this.backendUrl}/asistente/${this.config.idevento}/online/${identificacion}`;    
    return this.http.get<Asistente>(url).pipe(
      catchError(this.handleError<Asistente>('getAsistenteOnline'))
    );
  }

  getAsistenteAtributo(identificacion: number, atributo: string): Observable<AtributoAsistente> {
    const url = `${this.backendUrl}/asistente/${this.config.idevento}/${identificacion}/atributo/${atributo}`;    
    return this.http.get<AtributoAsistente>(url).pipe(
      catchError(this.handleError<AtributoAsistente>('getAsistenteAtributo'))
    );
  }

  addAsistente(asistente: Asistente): Observable<Asistente>{
    const url = `${this.backendUrl}/asistente/${this.config.idevento}`;   
    return this.http.post<Asistente>(url, asistente, httpOptions)
    .pipe(
      catchError(this.handleError<Asistente>('addAsistente'))
    );
  }

  updAsistente(asistente: Asistente): Observable<Asistente>{
    const url = `${this.backendUrl}/asistente/${this.config.idevento}`;
    return this.http.put<Asistente>(url, asistente, httpOptions)
    .pipe(
      catchError(this.handleError<Asistente>('updAsistente'))
    );
  }

  addAsistenciaZona(asistencia: AsistenciaZona): Observable<AsistenciaZona>{
    const url = `${this.backendUrl}/asistenciazona/${this.config.idevento}`;   
    return this.http.post<AsistenciaZona>(url, asistencia, httpOptions)
    .pipe(
      catchError(this.handleError<AsistenciaZona>('addAsistenciaZona'))
    );
  }

  getUltimaAsistenciaZona(asistencia: AsistenciaZona): Observable<AsistenciaZona> {
    const url = `${this.backendUrl}/asistenciazona/${this.config.idevento}/${asistencia.idasistente}/${asistencia.idzona}/${asistencia.idoperacion}`;    
    return this.http.get<AsistenciaZona>(url).pipe(
      catchError(this.handleError<AsistenciaZona>('getUltimaAsistenciaZona'))
    );
  }

  enviarCorreo(correo: Correo): Observable<string>{
    const url = `${this.backendUrl}/correo/${this.config.idevento}`;   
    return this.http.post<string>(url, correo, httpOptions)
    .pipe(
      catchError(this.handleError<string>('enviarCorreo'))
    );
  }
  
  login(usuario: Usuario): Observable<any>{
    const url = `${this.backendUrl}/login/${this.config.idevento}`;
    return this.http.post<any>(url, usuario, httpOptions)
    .pipe(
      catchError(this.handleError<any>('login'))
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
