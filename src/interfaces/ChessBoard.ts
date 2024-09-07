import { IChessNode, IPosition } from './ChessNode';

export interface IChessBoard {
  getBoard(): IChessNode[][];
  getBoardToString(): string;
  getNodeAt(position: IPosition): IChessNode | null;
  getPossibleMovesFromNode(node: IChessNode): IChessNode[];
}
