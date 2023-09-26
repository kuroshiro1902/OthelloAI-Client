import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { hostUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
}
