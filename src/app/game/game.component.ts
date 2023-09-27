import { Component, OnInit } from '@angular/core';
import { GameFacade } from './game.facade';
import { ICell } from '../models/Cell.model';
import { IMove } from '../models/Move.model';
import { findCellInValidMoves } from '../utils/cell.util';
import { Player } from '../constants/Player.constant';
import { IGameStats } from '../models/GameStats.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameStats: IGameStats | null = {} as IGameStats;
  constructor(private gameFacade: GameFacade) {}
  ngOnInit() {
    this.gameFacade.gameStats$.subscribe((res) => (this.gameStats = res));
    this.initial();
    // this.handleMove();
  }
  initial() {
    this.gameFacade.initial(Player.BLACK);
  }
  findCellInValidMoves(cell: ICell) {
    return findCellInValidMoves(cell, this.gameStats!.validMoves ?? []);
  }
  handleMove() {
    this.gameFacade.move(this.gameStats?.cells ?? [], Player.BLACK, null);
  }
}
