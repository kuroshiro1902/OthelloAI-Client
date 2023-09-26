import { Player } from '../constants/Player.constant';
import { Cell } from '../models/Cell.model';

const DecodeCellMapping: { [key: string]: Player } = {
  x: Player.EMPTY,
  b: Player.BLACK,
  w: Player.WHITE,
};
const EncodeCellMapping = {
  [Player.EMPTY]: 'x',
  [Player.BLACK]: 'b',
  [Player.WHITE]: 'w',
};
export const boardUtil = {
  decode(boardEncodeString: string) {
    const _boardEncodeString = boardEncodeString.padEnd(64, 'x');
    const cells: Cell[][] = [];

    for (let i = 0; i < 8; i++) {
      const row = Array.from(
        _boardEncodeString.substring(i * 8, 8),
        (char) => ({
          x: i,
          y:
            i % 2 === 0
              ? _boardEncodeString.indexOf(char)
              : 7 - _boardEncodeString.lastIndexOf(char),
          piece: DecodeCellMapping[char],
        })
      );

      cells.push(row);
    }

    return cells;
  },
  encode(cells: Cell[][]) {
    let boardEncodeString = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = cells[i][j].piece;
        boardEncodeString += EncodeCellMapping[piece];
      }
    }
    return boardEncodeString;
  },
};
