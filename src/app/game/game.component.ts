import { Component, OnInit } from '@angular/core';
import { GameFacade } from './game.facade';
import { ICell } from '../shared/models/Cell.model';
import { IMove } from '../shared/models/Move.model';
import { findCellInValidMoves as _findCellInValidMoves } from '../utils/cell.util';
import { EPlayer } from '../shared/constants/Player.constant';
import { IGameStats } from '../shared/models/GameStats.model';
import { IGameHistory } from '../shared/models/GameHistory.model';
import { IAnalytics } from '../shared/models/Analytics.model';
import { IMinimaxResult } from '../shared/models/MinimaxResult.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  playerOpt = EPlayer;

  isInitialLoading = true;
  isFetching = false;

  historyStack: IGameHistory[] = [];
  historyStackIndex: number = -1;

  ntf: string = '';

  gameStats: IGameStats = {} as IGameStats;
  isStarted: boolean = false;
  playerColor: EPlayer = EPlayer.BLACK;

  selectedCell?: ICell;

  mode: 'human' | 'ai' | 'ai_ai' = 'ai';

  winMessage: string | null = null;

  depth: number = 1;

  //ai vs ai mode
  isPaused: boolean = false;
  aiTimeoutId: any = null;

  //analytics
  analytics: IAnalytics = {};
  constructor(private gameFacade: GameFacade) {}

  get historyString(): string {
    return this.historyStack
      .map((gameHistory) => {
        if (gameHistory.move) {
          const player =
            gameHistory.gameStats.currentPlayer === EPlayer.BLACK ? 'W' : 'B';
          const { x, y } = gameHistory.move.to;
          return `${player}(${x},${y})`;
        } else return 'START';
      })
      .join(' - ');
  }

  get level(): string {
    switch (this.depth) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      case 4:
        return 'Expert';
      case 5:
        return 'Master';
      default:
        return '';
    }
  }

  get advantageMessage() {
    let message = 'Advantage for ';
    if (Math.abs(this.gameStats.evaluationValue) !== 10 ** 7) {
      if (this.gameStats.evaluationValue > 0) return message + this.playerColor;
      if (this.gameStats.evaluationValue < 0)
        return message + this.enemyOf(this.playerColor);
      return 'No one';
    } else {
      return 'End game';
    }
  }

  ngOnInit() {
    this.gameFacade.gameStats$.subscribe((res) => {
      this.gameStats = res;
      this.ntf = this.isStarted
        ? this.gameStats.currentPlayer + ' to move!'
        : 'Welcome to Othello!';
      this._assignResToGameStats(res!);
      this._enable();
    });
    this.initial();
  }

  initial() {
    this.isFetching = true;
    this.winMessage = null;
    this.gameStats.currentPlayer = this.playerColor;
    this.selectedCell = undefined;
    this.analytics = {};
    console.log(this.gameStats.currentPlayer);
    this.gameFacade.initial(this.playerColor).subscribe((res) => {
      this.gameFacade.gameStats = res;
      this._pushIntoHistoryStack({ gameStats: res });
      this.isInitialLoading = false;
      this._enable();
    });
  }

  startGame(bool: boolean) {
    this.isStarted = bool;
    clearTimeout(this.aiTimeoutId);
    this.historyStack = [];
    this.historyStackIndex = 0;
    this.initial();
    console.log(this.mode);

    if (this.mode === 'ai_ai' && this.isStarted) this.continueGame();
  }

  //pause in AI vs AI mode
  pauseGame() {
    clearTimeout(this.aiTimeoutId);
    this.isPaused = true;
  }
  //continue in AI vs AI mode
  continueGame() {
    this.isPaused = false;
    this.aiVsAi(this.gameStats);
  }

  move(event: any, move?: IMove) {
    this._disable();
    event.target.style.backgroundColor = 'var(--darkgreen)';
    if (move) {
      this._makeMove(move);
    }
  }

  _makeMove(move: IMove) {
    this.gameFacade
      .move(this.gameStats.cells, this.gameStats.currentPlayer, move)
      .subscribe((res) => {
        this._handleMoveResponse(res, move);
      });
  }

  _handleMoveResponse(res: IGameStats, move: IMove) {
    this._updateAfterMove(res, move, this.mode === 'ai' ? false : true);
    this.analyze(res);
    if (Math.abs(res.evaluationValue) === 10 ** 7) {
      this.winCalculate(res.cells);
    } else if (this.mode === 'ai') {
      this._makeAIMove(res);
    }
  }

  _makeAIMove(res: IGameStats) {
    setTimeout(() => {
      this.gameFacade.aiMove(res, this.depth).subscribe((minimaxRes) => {
        this._handleAIMoveResponse(res, minimaxRes);
      });
    }, 100);
  }

  _handleAIMoveResponse(res: IGameStats, minimaxRes: IMinimaxResult) {
    this.gameFacade
      .move(res.cells, res.currentPlayer, minimaxRes.bestMove)
      .subscribe((aiRes) => {
        this._updateAfterMove(aiRes, minimaxRes.bestMove, true);
        this.analyze(aiRes);
        if (Math.abs(aiRes.evaluationValue) === 10 ** 7) {
          this.winCalculate(aiRes.cells);
        }
      });
  }

  //AI vs AI mode recursion
  aiVsAi(res: IGameStats) {
    if (this.isStarted && !this.isPaused) {
      this.aiTimeoutId = setTimeout(() => {
        this.gameFacade.aiMove(res, this.depth).subscribe((minimaxRes) => {
          this.gameFacade
            .move(res.cells, res.currentPlayer, minimaxRes.bestMove)
            .subscribe((aiRes) => {
              this._updateAfterMove(aiRes, minimaxRes.bestMove, false);
              this.analyze(aiRes);
              if (Math.abs(aiRes.evaluationValue) === 10 ** 7) {
                this.winCalculate(aiRes.cells);
              } else {
                // Switch to the other AI and make a move
                this.aiVsAi(aiRes);
              }
            });
        });
      }, 1000);
    }
  }

  analyze(gameStats: IGameStats): void {
    const { blackAmount, whiteAmount } = this.pieceCalculate(gameStats.cells);
    this.analytics = { blackAmount, whiteAmount };
  }

  changeHistory(step: -1 | 1) {
    this.historyStackIndex += step;
    this.gameFacade.gameStats =
      this.historyStack[this.historyStackIndex].gameStats;
  }

  findCellInValidMoves(cell: ICell) {
    return _findCellInValidMoves(cell, this.gameStats!.validMoves ?? []);
  }

  pieceCalculate(cells: ICell[][]): {
    blackAmount: number;
    whiteAmount: number;
  } {
    let blackAmount = 0;
    let whiteAmount = 0;
    for (let row of cells) {
      for (let cell of row) {
        if (cell.piece === EPlayer.BLACK) blackAmount++;
        else if (cell.piece === EPlayer.WHITE) whiteAmount++;
      }
    }
    return { blackAmount, whiteAmount };
  }

  winCalculate(cells: ICell[][]) {
    let message = '';
    const { blackAmount, whiteAmount } = this.pieceCalculate(cells);
    message += `Black: ${blackAmount}\nWhite: ${whiteAmount}\n\n`;
    if (blackAmount > whiteAmount) message += EPlayer.BLACK + ' WON!';
    else if (blackAmount < whiteAmount) message += EPlayer.WHITE + ' WON!';
    else message += 'DRAW';
    this.winMessage = message;
  }

  private _updateAfterMove(
    res: IGameStats,
    move: IMove | null,
    isUpdateValidMoves: boolean
  ) {
    this.selectedCell = move?.to;
    this.gameFacade.gameStats = {
      ...res,
      validMoves: isUpdateValidMoves ? res.validMoves : [],
    };
    this._pushIntoHistoryStack({ gameStats: res, move: move ?? undefined });
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
    // if (this.historyStack.length >= 5) {
    //   this.historyStack.shift();
    // }
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

  private enemyOf(playerColor: EPlayer | string): EPlayer | string {
    if (playerColor === EPlayer.BLACK) return EPlayer.WHITE;
    return EPlayer.BLACK;
  }
}
