import { Player } from '../constants/Player.constant';
import { ICell } from './Cell.model';

export interface IMove {
  player?: Player;
  froms: ICell[];
  to: ICell;
  flips: ICell[];
}
