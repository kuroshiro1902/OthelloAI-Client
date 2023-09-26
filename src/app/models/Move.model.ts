import { Player } from "../constants/Player.constant";
import { Cell } from "./Cell.model";

export default interface Move {
  player?: Player;
  froms: Cell[];
  to: Cell;
  flips: Cell[];
}
