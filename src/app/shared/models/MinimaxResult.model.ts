import { IMove } from './Move.model';

export interface IMinimaxResult {
  bestMove: IMove | null;
  evaluationValue: number;
  positionCount: {
    value: number;
  };
}
