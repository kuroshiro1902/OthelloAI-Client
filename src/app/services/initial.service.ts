import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';
import { Cell } from '../models/Cell.model';

@Injectable({
  providedIn: 'root',
})
export class InitialService {
  constructor(private queryService: QueryService) {}
  initial(): Observable<Cell[][]> {
    return this.queryService.get('initialize');
  }
}
