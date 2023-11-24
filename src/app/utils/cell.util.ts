import { ICell } from '../shared/models/Cell.model';
import { IMove } from '../shared/models/Move.model';

export function findCellInValidMoves(cell: ICell, validMoves: IMove[]) {
  return validMoves.find(
    (move) => move.to.x === cell.x && move.to.y === cell.y
  );
}
