import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { InitialService } from '../services/initial.service';
import { ICell } from '../models/Cell.model';
import { IPlayer } from '../models/Player.model';
import { IMove } from '../models/Move.model';
import { MoveService } from '../services/move.service';
import { Player } from '../constants/Player.constant';
import { IGameStats } from '../models/GameStats.model';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private _gameStats = new BehaviorSubject<IGameStats | null>(null);
  private _firstPlayer = new BehaviorSubject<IPlayer | null>(null);
  private _secondPlayer = new BehaviorSubject<IPlayer | null>(null);
  constructor(
    private initialService: InitialService,
    private moveService: MoveService
  ) {}

  get firstPlayer$() {
    return this._asObservable(this._firstPlayer);
  }

  set firstPlayer(value: IPlayer) {
    this._firstPlayer.next(value);
  }

  get secondPlayer$() {
    return this._asObservable(this._secondPlayer);
  }

  set secondPlayer(value: IPlayer) {
    this._secondPlayer.next(value);
  }

  get gameStats$() {
    return this._asObservable(this._gameStats);
  }

  set gameStats(value: IGameStats) {
    this._gameStats.next(value);
  }

  initial(currentPlayer: Player) {
    this.initialService.initial(currentPlayer).subscribe((res) => {
      this.gameStats = res;
    });
  }

  move(cells: ICell[][], currentPlayer: Player, move: IMove | null) {
    this.moveService.move(cells, currentPlayer, move).subscribe((res) => {
      this.gameStats = res;
    });
  }

  private _asObservable<T>(
    subject: BehaviorSubject<T | null>
  ): Observable<T | null> {
    return subject.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }
}
