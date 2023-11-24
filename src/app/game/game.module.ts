import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { ReverseRowPipe } from '../shared/pipes/reverse-row.pipe';
import { FormsModule } from '@angular/forms';
import { EnemyPipe } from '../shared/pipes/enemy.pipe';
import { OverlayComponent } from '../overlay/overlay.component';

@NgModule({
  declarations: [GameComponent, OverlayComponent, ReverseRowPipe, EnemyPipe],
  imports: [CommonModule, FormsModule],
})
export class GameModule {}
