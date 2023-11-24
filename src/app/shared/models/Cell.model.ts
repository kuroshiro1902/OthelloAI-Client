import { EPlayer } from '../constants/Player.constant';

export interface ICell {
  x: number;
  y: number;
  piece: EPlayer;
}
