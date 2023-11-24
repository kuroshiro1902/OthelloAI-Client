import { EPlayer } from '../constants/Player.constant';
import { ICell } from './Cell.model';

export interface IMove {
  player?: EPlayer;
  froms: ICell[];
  to: ICell;
  flips: ICell[];
}
