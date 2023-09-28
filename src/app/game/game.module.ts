import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { ReverseRowPipe } from '../pipes/reverse-row.pipe';
import { FormsModule } from '@angular/forms';
import { EnemyPipe } from '../pipes/enemy.pipe';

@NgModule({
  declarations: [GameComponent, ReverseRowPipe, EnemyPipe],
  imports: [CommonModule, FormsModule],
})
export class GameModule {}
