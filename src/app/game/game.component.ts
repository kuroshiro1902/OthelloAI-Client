import { Component, OnInit } from '@angular/core';
import { GameFacade } from './game.facade';
import { ICell } from '../models/Cell.model';
import { IMove } from '../models/Move.model';
import { findCellInValidMoves } from '../utils/cell.util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  cells: ICell[][] | null = [];
  validMoves: IMove[] = [];
  constructor(private gameFacade: GameFacade) {}
  ngOnInit() {
    this.gameFacade.cells$.subscribe((res) => (this.cells = res));
    this.initial();
  }
  initial() {
    this.gameFacade.initial();
  }
  findCellInValidMoves(cell: ICell) {
    return findCellInValidMoves(cell, this.validMoves);
  }
  handleMove(event: any) {
    console.log(event);
  }
}
