import { IChessNode, IPosition, NodePosition } from '@/interfaces/ChessNode';
import { ChessNodeModel } from './ChessNode';
import { IChessBoard } from '@/interfaces/ChessBoard';

export class ChessBoardModel implements IChessBoard {
  private board: IChessNode[][];

  constructor(boardSize: number) {
    this.board = this.createBoard(boardSize);
    this.connectAdjacentNodes(boardSize);
  }

  // Método que cria o tabuleiro inicial
  private createBoard(boardSize: number): IChessNode[][] {
    const board: IChessNode[][] = [];

    for (let x = 0; x < boardSize; x++) {
      const row: IChessNode[] = [];
      for (let y = 0; y < boardSize; y++) {
        const position: IPosition = { x, y };
        row.push(new ChessNodeModel(position));
      }
      board.push(row);
    }

    return board;
  }

  // Método para conectar os nós adjacentes
  private connectAdjacentNodes(boardSize: number): void {
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        const currentNode = this.board[x][y];

        if (x > 0) {
          const nodeLeft = this.board[x - 1][y];
          currentNode.addAdjacentNode(nodeLeft, NodePosition.LEFT);
        }

        if (y > 0) {
          const nodeUp = this.board[x][y - 1];
          currentNode.addAdjacentNode(nodeUp, NodePosition.UP);
        }

        if (x < boardSize - 1) {
          const nodeRight = this.board[x + 1][y];
          currentNode.addAdjacentNode(nodeRight, NodePosition.RIGHT);
        }

        if (y < boardSize - 1) {
          const nodeDown = this.board[x][y + 1];
          currentNode.addAdjacentNode(nodeDown, NodePosition.DOWN);
        }
      }
    }
  }

  public getBoard(): IChessNode[][] {
    return this.board;
  }

  public getBoardToString(): string {
    return this.board
      .map((row) =>
        row
          .map((node) => {
            const { x, y } = node.getPosition();
            return `[${x},${y}]: ${
              node.isVisited() ? 'visitada' : 'não visitada'
            }`;
          })
          .join('\n')
      )
      .join('\n');
  }

  public getNodeAt({ x, y }: IPosition): IChessNode | null {
    if (x >= 0 && x < this.board.length && y >= 0 && y < this.board[x].length) {
      return this.board[x][y];
    }
    return null;
  }
}
