import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { IPlayer } from '../models/Player.model';
import { ICell } from '../models/Cell.model';
import { IMove } from '../models/Move.model';
import { Player } from '../constants/Player.constant';
@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private queryService: QueryService) {}
  move(cells: ICell[][], currentPlayer: Player, move: IMove | null) {
    return this.queryService.post('move', { cells, currentPlayer, move });
  }
}
