import { Injectable } from '@angular/core';
import { Cell } from '../models/Cell.model';
import { InitialService } from '../services/initial.service';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private _cells = new BehaviorSubject<Cell[][] | null>(null);
  constructor(private initialService: InitialService) {}
  get cells$(): Observable<Cell[][]> {
    return this._cells.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }
  set cells(value: Cell[][]) {
    this._cells.next(value);
  }
  initial() {
    this.initialService.initial().subscribe((res) => {
      this.cells = res;
    });
  }
}
