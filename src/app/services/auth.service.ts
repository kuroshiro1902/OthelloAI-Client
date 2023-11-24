import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private queryService: QueryService) {}
  login(username: string, password: string): Observable<string> {
    return this.queryService.post('user/log-in', { username, password });
  }
  signup(username: string, password: string): Observable<string> {
    return this.queryService.post('user/sign-up', { username, password });
  }
}
