import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';
import { ICell } from '../shared/models/Cell.model';
import { EPlayer } from '../shared/constants/Player.constant';
import { IMinimaxResult } from '../shared/models/MinimaxResult.model';

@Injectable({
  providedIn: 'root',
})
export class MinimaxService {
  constructor(private queryService: QueryService) {}
  minimax(
    cells: ICell[][],
    depth: number,
    evaluationValue: number,
    currentPlayer: EPlayer
  ): Observable<IMinimaxResult> {
    return this.queryService.post('ai/minimax', {
      // return this.queryService.post('minimax', {
      cells,
      depth,
      evaluationValue,
      currentPlayer,
    });
  }
}
