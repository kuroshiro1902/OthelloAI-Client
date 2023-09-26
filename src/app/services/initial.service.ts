import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';
import { ICell } from '../models/Cell.model';

@Injectable({
  providedIn: 'root',
})
export class InitialService {
  constructor(private queryService: QueryService) {}
  initial(): Observable<ICell[][]> {
    return this.queryService.get('initialize');
  }
}
