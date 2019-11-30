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
export class EventManagerService {

  private backendUrl = environment.URLBack;

  constructor(private http: HttpClient) { }

  /**
   * Call service to create new event
   * @param eventRequest 
   */
  createEvent(eventRequest) {
    const url = `${this.backendUrl}`+`/v2/events`;
    var response = this.http.post<any>(url, eventRequest, httpOptions)
      .pipe(
        catchError(this.handleError('createEvent', eventRequest))
      );
    return response;
  }

  /**
 * Get Events
 * @author Ricardo Carvajal 
 * @param
 */
getEvents() {
  const url = `${this.backendUrl}/v2/events/`;
  return this.http.get<any>(url).pipe(
    catchError(this.handleError<any>('events'))
  )
}

  /**
 * Get Events
 * @author Ricardo Carvajal 
 * @param
 */
getEvent(eventId) {
  const url = `${this.backendUrl}/v2/events/`+eventId;
  return this.http.get<any>(url).pipe(
    catchError(this.handleError<any>('events'))
  )
}

 /**
 * Get Events
 * @author Ricardo Carvajal 
 * @param
 */
getZoneByEvent(eventId) {
  const url = `${this.backendUrl}/v2/zones/`+eventId;
  return this.http.get<any>(url).pipe(
    catchError(this.handleError<any>('events'))
  )
}

 /**
 * Delete Events
 * @author Ricardo Carvajal 
 * @param
 */
deleteEvent(eventId) {
  const url = `${this.backendUrl}/v2/events/`+eventId;
  return this.http.delete<any>(url).pipe(
    catchError(this.handleError<any>('deleteEvent'))
  )
}



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error.message); // log to console instead
      console.error(operation);
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}


