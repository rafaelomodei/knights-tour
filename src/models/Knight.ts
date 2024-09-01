import { IAdjacentNodes, IChessNode, IPosition } from '@/interfaces/ChessNode';
import { IKnight } from '@/interfaces/Knight';
import { ChessBoardModel } from './ChessBoard';
import { IChessEdge } from '@/interfaces/ChessEdge';

export class KnightModel implements IKnight {
  private currentPosition: IChessNode;
  private moveHistory: IChessEdge[] = [];
  private board: ChessBoardModel;

  constructor(initialPosition: IChessNode, board: ChessBoardModel) {
    initialPosition.markVisited();

    this.currentPosition = initialPosition;
    this.moveHistory.push({
      from: this.currentPosition,
      to: this.currentPosition,
    });
    this.board = board;
  }

  public move(position: IChessNode): IChessNode {
    console.info('movendo...');
    position.markVisited();

    this.moveHistory.push({ from: this.currentPosition, to: position });
    this.currentPosition = position;

    return this.currentPosition;
  }

  public getPossibleMoves(): IChessNode[] {
    const possibleMoves: IChessNode[] = [];

    const knightMoves = [
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 },
    ];

    for (const move of knightMoves) {
      const newPosition = {
        x: this.currentPosition.getPosition().x + move.x,
        y: this.currentPosition.getPosition().y + move.y,
      };

      // O tabuleiro valida e retorna o nó correspondente à nova posição
      const node = this.board.getNodeAt({ x: newPosition.x, y: newPosition.y });
      if (node && !node.isVisited()) {
        possibleMoves.push(node);
      }
    }

    return possibleMoves;
  }

  public isKnightTrapped(): boolean {
    const possibleMoves = this.getPossibleMoves();
    const unvisitedNodes = this.board
      .getBoard()
      .flat()
      .filter((node) => !node.isVisited());
    return possibleMoves.length === 0 && unvisitedNodes.length > 0;
  }

  public getMoveHistory(): IChessEdge[] {
    return this.moveHistory;
  }

  public getCurrentPosition(): IChessNode {
    return this.currentPosition;
  }
}
