import { EPlayer } from '../constants/Player.constant';
import { ICell } from './Cell.model';
import { IMove } from './Move.model';

export interface IGameStats {
  cells: ICell[][];
  currentPlayer: EPlayer;
  validMoves: IMove[];
  evaluationValue: number;
}
