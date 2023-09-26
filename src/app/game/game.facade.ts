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

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private _cells = new BehaviorSubject<ICell[][] | null>(null);
  private _firstPlayer = new BehaviorSubject<IPlayer | null>(null);
  private _secondPlayer = new BehaviorSubject<IPlayer | null>(null);
  private _currentPlayer = new BehaviorSubject<IPlayer | null>(null);

  constructor(private initialService: InitialService) {}

  get cells$() {
    return this._asObservable(this._cells);
  }

  set cells(value: ICell[][]) {
    this._cells.next(value);
  }

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

  get currentPlayer$() {
    return this._asObservable(this._currentPlayer);
  }

  set currentPlayer(value: IPlayer) {
    this._currentPlayer.next(value);
  }

  initial() {
    this.initialService.initial().subscribe((res) => {
      this.cells = res;
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
