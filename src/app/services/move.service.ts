import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { ICell } from '../shared/models/Cell.model';
import { IMove } from '../shared/models/Move.model';
import { EPlayer } from '../shared/constants/Player.constant';
import { IGameStats } from '../shared/models/GameStats.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private queryService: QueryService) {}
  move(
    cells: ICell[][],
    currentPlayer: EPlayer,
    move: IMove | null
  ): Observable<IGameStats> {
    return this.queryService.post('move', { cells, currentPlayer, move });
  }
}
