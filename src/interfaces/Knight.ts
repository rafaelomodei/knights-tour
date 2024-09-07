import { IChessEdge } from './ChessEdge';
import { IChessNode } from './ChessNode';

export interface IKnight {
  move(position: IChessNode): IChessNode;
  getPossibleMoves(): IChessNode[];
  getPossibleMovesToString(): string;
  getMoveHistory(): IChessEdge[];
  getCurrentPosition(): IChessNode;
  isKnightTrapped(): boolean;
  getBestMoveByWarnsdorff(): IChessNode | null;
}
