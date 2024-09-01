export enum NodePosition {
  LEFT,
  UP,
  RIGHT,
  DOWN,
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IAdjacentNodes {
  nodeLeft: IChessNode | null;
  nodeUp: IChessNode | null;
  nodeRight: IChessNode | null;
  nodeDown: IChessNode | null;
}

export interface IChessNode {
  addAdjacentNode(edge: IChessNode, nodePosition: NodePosition): void;
  getAdjacentNodes(): IAdjacentNodes;
  markVisited(): void;
  isVisited(): boolean;
  getPosition(): IPosition;
}
