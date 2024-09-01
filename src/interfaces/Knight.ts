import { IChessEdge } from './ChessEdge';
import { IChessNode } from './ChessNode';

export interface IKnight {
  move(position: IChessNode): IChessNode;
  getPossibleMoves(): IChessNode[];
  getMoveHistory(): IChessEdge[];
  getCurrentPosition(): IChessNode;
  isKnightTrapped(): boolean;
}
