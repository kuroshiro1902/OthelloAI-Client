import { Direction as IDirection } from "../models/Direction.model";
const Direction: Record<string, IDirection> = {
  TOPLEFT: { dx: -1, dy: -1 },
  TOP: { dx: -1, dy: 0 },
  TOPRIGHT: { dx: -1, dy: 1 },
  LEFT: { dx: 0, dy: -1 },
  RIGHT: { dx: 0, dy: 1 },
  BOTTOMLEFT: { dx: 1, dy: -1 },
  BOTTOM: { dx: 1, dy: 0 },
  BOTTOMRIGHT: { dx: 1, dy: 1 },
};

export default Direction;
