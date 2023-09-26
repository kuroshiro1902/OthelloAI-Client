import { Component, OnInit } from '@angular/core';
import { GameFacade } from './game.facade';
import { Cell } from '../models/Cell.model';
import Move from '../models/Move.model';
import { findCellInValidMoves } from '../utils/cell.util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  cells: Cell[][] = [];
  validMoves: Move[] = [];
  constructor(private gameFacade: GameFacade) {}
  ngOnInit() {
    this.gameFacade.cells$.subscribe((res) => (this.cells = res));
    this.initial();
  }
  initial() {
    this.gameFacade.initial();
  }
  findCellInValidMoves(cell: Cell) {
    return findCellInValidMoves(cell, this.validMoves);
  }
  handleMove(event: any) {
    console.log(event);
  }
}
