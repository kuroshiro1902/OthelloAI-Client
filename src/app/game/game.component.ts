import { Component, OnInit } from '@angular/core';
import { GameFacade } from './game.facade';
import { ICell } from '../shared/models/Cell.model';
import { IMove } from '../shared/models/Move.model';
import { findCellInValidMoves } from '../utils/cell.util';
import { Player } from '../shared/constants/Player.constant';
import { IGameStats } from '../shared/models/GameStats.model';
import { ILabelValue } from '../shared/models/LabelValue.model';
import { IGameHistory } from '../shared/models/GameHistory.model';

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

  isInitialLoading = true;
  isFetching = false;

  historyStack: IGameHistory[] = [];
  historyStackIndex: number = -1;

  gameStats: IGameStats = {} as IGameStats;
  isStarted: boolean = false;
  playerColor: Player = Player.BLACK;

  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.gameStats$.subscribe((res) => {
      this._assignResToGameStats(res!);
      this._enable();
    });
    this.initial();
  }

  initial() {
    this.isFetching = true;
    this.gameStats.currentPlayer = this.playerColor;
    this.gameFacade.initial(this.playerColor).subscribe((res) => {
      this.gameFacade.gameStats = res;
      this._pushIntoHistoryStack({ gameStats: res });
      this.isInitialLoading = false;
      this._enable();
      this.gameFacade.gameStats = res;
    });
  }

  startGame(bool: boolean) {
    this.isStarted = bool;
    this.initial();
  }

  move(event: any, move?: IMove) {
    this._disable();
    event.target.style.backgroundColor = 'var(--darkgreen)';
    if (move)
      this.gameFacade
        .move(this.gameStats.cells, this.gameStats.currentPlayer, move)
        .subscribe((res) => {
          this.gameFacade.gameStats = res;
          this._pushIntoHistoryStack({ gameStats: res, move });
        });
  }

  prev() {
    this.historyStackIndex -= 1;
    this.gameFacade.gameStats =
      this.historyStack[this.historyStackIndex].gameStats;
  }

  next() {
    this.historyStackIndex += 1;
    this.gameFacade.gameStats =
      this.historyStack[this.historyStackIndex].gameStats;
  }

  _findCellInValidMoves(cell: ICell) {
    return findCellInValidMoves(cell, this.gameStats!.validMoves ?? []);
  }

  private _enable() {
    this.isFetching = false;
  }

  private _disable() {
    this.gameStats.validMoves = [];
    this.isFetching = true;
  }

  private _pushIntoHistoryStack(h: IGameHistory) {
    this.historyStackIndex += 1;
    if (this.historyStack.length >= 5) {
      this.historyStack.shift();
    }
    this.historyStack = this.historyStack.slice(0, this.historyStackIndex);
    this.historyStack.push(h);
    this.historyStackIndex = this.historyStack.length - 1;
  }

  private _assignResToGameStats(res: IGameStats) {
    this.gameStats = {
      ...res!,
      validMoves: this.isStarted ? res!.validMoves : [],
    };
  }
}
