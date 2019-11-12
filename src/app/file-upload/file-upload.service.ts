import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FileUploadService {


  constructor(private http: HttpClient) { }

  backendUrl = environment.URLBack;

  public uploadFile(file: File, event) {
    console.log('Event----->>'+event);
    if (file.type == 'application/vnd.ms-excel') {
      return this.uploadCSV(file, event);
    }
    return this.uploadImage(file, event);
  }

  /**
   * Service for uploadImages for event
   * @param file 
   * @param event 
   */
  private uploadImage(file: File, event): Observable<Response> {
    const url = `${this.backendUrl}` + `/uploadImage`;
    const formData = new FormData();
    //The param name file is important because the back service recognize it
    formData.append('file', file);
    formData.append('event', event);
    var response = this.http.post<any>(url, formData)
      .pipe(
        catchError(this.handleError('uploadImage', response))
      );
    return response;
  }

  /**
   * Service for upload CSV for attendees
   * @param file 
   * @param event 
   */
  private uploadCSV(file: File, event): Observable<Response> {
    const url = `${this.backendUrl}` + `/uploadCSV`;
    const formData = new FormData();
    //The param name file is important because the back service recognize it
    formData.append('file', file);
    formData.append('event', event);
    var response = this.http.post<any>(url, formData)
      .pipe(
        catchError(this.handleError('uploadImage', response))
      );
    return response;
  }

  /**
* Get Events
* @author Ricardo Carvajal 
* @param
*/
  getFiles(eventId) {
    const url = `${this.backendUrl}/v2/files/` + eventId;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('files'))
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
