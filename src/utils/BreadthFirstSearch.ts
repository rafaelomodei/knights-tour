import { IChessNode } from '@/interfaces/ChessNode';

interface BreadthFirstSearchProps {
  currentPosition: IChessNode;
  possibleMoves: IChessNode[];
}

const BreadthFirstSearch = (
  props: BreadthFirstSearchProps
): IChessNode | null => {
  const { currentPosition, possibleMoves } = props;

  let queue: IChessNode[] = [];
  let visited: Set<IChessNode> = new Set();

  queue.push(currentPosition);
  visited.add(currentPosition);

  while (queue.length > 0) {
    queue.shift()!;

    for (let neighbor of possibleMoves) {
      if (!neighbor.isVisited() && !visited.has(neighbor)) {
        visited.add(neighbor);
        return neighbor; // Retorna o primeiro nó não visitado encontrado
      }
    }
  }

  return null; // Se não houver mais movimentos válidos
};

export { BreadthFirstSearch };
