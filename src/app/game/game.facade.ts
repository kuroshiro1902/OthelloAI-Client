import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { InitialService } from '../services/initial.service';
import { ICell } from '../shared/models/Cell.model';
import { IPlayer } from '../shared/models/Player.model';
import { IMove } from '../shared/models/Move.model';
import { MoveService } from '../services/move.service';
import { Player } from '../shared/constants/Player.constant';
import { IGameStats } from '../shared/models/GameStats.model';

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
    return this.initialService.initial(currentPlayer);
  }

  move(cells: ICell[][], currentPlayer: Player, move: IMove | null) {
    return this.moveService.move(cells, currentPlayer, move);
  }

  private _asObservable<T>(
    subject: BehaviorSubject<T | any>
  ): Observable<T | any> {
    return subject.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }
}
