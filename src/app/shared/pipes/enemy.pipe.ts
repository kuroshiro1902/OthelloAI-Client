import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../constants/Player.constant';

@Pipe({
  name: 'enemy',
})
export class EnemyPipe implements PipeTransform {
  transform(playerColor: Player | string): Player | string {
    if (playerColor === Player.BLACK) return Player.WHITE;
    return Player.BLACK;
  }
}
