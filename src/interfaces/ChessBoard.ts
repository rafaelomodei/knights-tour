import { IChessNode, IPosition } from './ChessNode';

export interface IChessBoard {
  getBoard(): IChessNode[][];
  getNodeAt(position: IPosition): IChessNode | null;
}
