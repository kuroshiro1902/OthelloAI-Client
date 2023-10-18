import { EPlayer } from '../shared/constants/Player.constant';

export function enemyOf(player: EPlayer) {
  if (player === EPlayer.BLACK) return EPlayer.WHITE;
  return EPlayer.BLACK;
}
