import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private queryService: QueryService) {}
  login(username: string, password: string): Observable<any> {
    return this.queryService
      .post('user/log-in', { username, password })
      .pipe(catchError((err) => err));
  }
  signup(username: string, password: string): Observable<any> {
    return this.queryService
      .post('user/sign-up', { username, password })
      .pipe(catchError((err) => err));
  }
}
