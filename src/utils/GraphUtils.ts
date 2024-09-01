import { PositionModel } from "../models/ChessNode";

export class GraphUtils {
    static isHamiltonianPath(positions: PositionModel[], boardSize: number): boolean {
      return positions.length === boardSize * boardSize;
    }
  }
  