import { Pipe, PipeTransform } from '@angular/core';
import { EPlayer } from '../constants/Player.constant';

@Pipe({
  name: 'enemy',
})
export class EnemyPipe implements PipeTransform {
  transform(playerColor: EPlayer | string): EPlayer | string {
    if (playerColor === EPlayer.BLACK) return EPlayer.WHITE;
    return EPlayer.BLACK;
  }
}
