import { Component, OnInit } from '@angular/core';
import { GameFacade } from './game.facade';
import { ICell } from '../models/Cell.model';
import { IMove } from '../models/Move.model';
import { findCellInValidMoves } from '../utils/cell.util';
import { Player } from '../constants/Player.constant';
import { IGameStats } from '../models/GameStats.model';
import { ILabelValue } from '../models/LabelValue.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  optPlayer: ILabelValue[] = [
    { label: 'Play as: BLACK', value: Player.BLACK },
    { label: 'Play as: WHITE', value: Player.WHITE },
  ];

  gameStats: IGameStats = {} as IGameStats;
  isStarted: boolean = false;
  playerColor: Player = Player.BLACK;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.gameStats$.subscribe((res) => {
      console.log(res);

      this._assignResToGameStats(res!);
    });
    this.initial();
  }

  initial() {
    this.gameStats.currentPlayer = this.playerColor;
    this.gameFacade.initial(this.playerColor);
  }

  startGame(bool: boolean) {
    this.isStarted = bool;
    this.initial();
  }

  move(move?: IMove) {
    if (move)
      this.gameFacade.move(
        this.gameStats.cells,
        this.gameStats.currentPlayer,
        move
      );
  }

  _findCellInValidMoves(cell: ICell) {
    return findCellInValidMoves(cell, this.gameStats!.validMoves ?? []);
  }

  private _assignResToGameStats(res: IGameStats) {
    this.gameStats = {
      ...res!,
      validMoves: this.isStarted ? res!.validMoves : [],
    };
  }
}
