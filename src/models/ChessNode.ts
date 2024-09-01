import {
  IAdjacentNodes,
  IChessNode,
  IPosition,
  NodePosition,
} from '@/interfaces/ChessNode';

export class ChessNodeModel implements IChessNode {
  private position: IPosition;
  private visited: boolean = false;
  private nodeLeft: IChessNode | null = null;
  private nodeUp: IChessNode | null = null;
  private nodeRight: IChessNode | null = null;
  private nodeDown: IChessNode | null = null;

  constructor(position: IPosition) {
    this.position = position;
  }

  public getPosition(): IPosition {
    return this.position;
  }

  public isVisited(): boolean {
    return this.visited;
  }

  public markVisited(): void {
    this.visited = true;
  }

  public addAdjacentNode(node: IChessNode, nodePosition: NodePosition): void {
    if (nodePosition === NodePosition.LEFT) this.nodeLeft = node;
    if (nodePosition === NodePosition.UP) this.nodeUp = node;
    if (nodePosition === NodePosition.RIGHT) this.nodeRight = node;
    if (nodePosition === NodePosition.DOWN) this.nodeDown = node;
  }

  public getAdjacentNodes(): IAdjacentNodes {
    const adjacentNodes = {
      nodeLeft: this.nodeLeft,
      nodeUp: this.nodeUp,
      nodeRight: this.nodeRight,
      nodeDown: this.nodeDown,
    };

    return adjacentNodes;
  }
}
