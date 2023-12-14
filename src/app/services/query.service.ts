import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { hostUrl } from 'src/environments/environment';
import { Observable, catchError, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private _options = {};
  constructor(private httpClient: HttpClient) {
    this._options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  get(query: string): Observable<any> {
    return this.httpClient.get(`${hostUrl}${query}`, this._options);
  }
  post(query: string, body: any): Observable<any> {
    return this.httpClient.post(`${hostUrl}${query}`, body, this._options);
  }

  auth<T>(
    query: string,
    method: 'post' | 'get' | 'put',
    data?: any
  ): Observable<T> {
    if (method === 'get') {
      return this.httpClient.get<T>(`${hostUrl}${query}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('othello_token'),
        }),
      });
    } else {
      return this.httpClient[method]<T>(`${hostUrl}${query}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('othello_token'),
        }),
      });
    }
  }
}
