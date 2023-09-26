import { Player } from '../constants/Player.constant';

export interface ICell {
  x: number;
  y: number;
  piece: Player;
}
