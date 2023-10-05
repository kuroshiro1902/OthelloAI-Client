import { Player } from '../constants/Player.constant';
import { ICell } from './Cell.model';
import { IMove } from './Move.model';

export interface IGameStats {
  cells: ICell[][];
  currentPlayer: Player;
  validMoves: IMove[];
  // EvaluationValue;
}
