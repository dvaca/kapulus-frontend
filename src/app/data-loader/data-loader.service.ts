import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataLoaderService {

  private backendUrl = environment.URLBack;

  constructor(private http: HttpClient) { }

  /**
 * Get Events
 * @author Ricardo Carvajal 
 * @param
 */
  getEvents() {
    const url = `${this.backendUrl}/v2/events/`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('events'))
    );
  }

    /**
 * Get Uploaded Files
 * @author Ricardo Carvajal 
 * @param
 */
  getFiles(eventId) {
    const url = `${this.backendUrl}/v2/files/`+eventId;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('files'))
    );
  }
  
  /**
   * Get the import file information
   * @param storage 
   */
  processFile(storage){
    const url = `${this.backendUrl}/v2/processFile`;
    var response = this.http.post<any>(url,storage, httpOptions)
      .pipe(
        catchError(this.handleError('processFile', storage))
      );
    return response;
  }

  /**
   * Updata event info
   * @param event
   */
  updateEvent(event){
    const url = `${this.backendUrl}/v2/events/`+event.id;
    var response = this.http.put<any>(url,event, httpOptions)
      .pipe(
        catchError(this.handleError('processFile', event))
      );
    return response;
  }

  /**
   * Load the data from csv to database after save the settings file
   * @param storage 
   */
  toDatabase(storage){
    const url = `${this.backendUrl}/v2/toDatabase`;
    var response = this.http.post<any>(url,storage, httpOptions)
      .pipe(
        catchError(this.handleError('toDatabase', response))
      );
    return response;
  }

  /**
   * Delete the data loaded form CSV. It happens when the user want to reverse a previous loading
   * @param storage 
   */
  deleteDataLoaded(storage){
    const url = `${this.backendUrl}/v2/deleteDataLoaded`;
    var response = this.http.post<any>(url,storage, httpOptions)
      .pipe(
        catchError(this.handleError('toDatabase', storage))
      );
    return response;
  }

  /**
   * Delete the uploaded File
   * @param storage 
   */
  deleteStorage(storage){
    const url = `${this.backendUrl}/v2/storages/`+storage.storageId;
    var response = this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError('toDatabase', storage))
      );
    return response;
  }




  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error.message); // log to console instead
      console.error(operation);
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.throw(error);
     // return of(result as T);
    };
  }

}


