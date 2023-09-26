import { Cell } from '../models/Cell.model';
import Move from '../models/Move.model';

export function findCellInValidMoves(cell: Cell, validMoves: Move[]) {
  return validMoves.find(
    (move) => move.to.x === cell.x && move.to.y === cell.y
  );
}
