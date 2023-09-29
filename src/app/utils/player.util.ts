import { Player } from '../constants/Player.constant';

export function enemyOf(player: Player) {
  if (player === Player.BLACK) return Player.WHITE;
  return Player.BLACK;
}
