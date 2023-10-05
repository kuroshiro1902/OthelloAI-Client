import { IGameStats } from './GameStats.model';
import { IMove } from './Move.model';

export interface IGameHistory {
  gameStats: IGameStats;
  move?: IMove;
}
