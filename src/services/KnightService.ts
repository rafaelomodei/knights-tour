import { BreadthFirstSearch } from '@/utils/BreadthFirstSearch';
import { IChessNode } from '@/interfaces/ChessNode';
import { KnightModel } from '@/models/Knight';

export class KnightService {
  private knight: KnightModel;

  constructor(knight: KnightModel) {
    this.knight = knight;
  }

  public moveKnightUsingBFS(): IChessNode | null {
    const currentPosition = this.knight.getCurrentPosition();
    const possibleMoves = this.knight.getPossibleMoves();

    if (possibleMoves.length === 0) {
      console.log('O cavalo está preso e não pode se mover.');
      return null;
    }

    const nextMove = BreadthFirstSearch({ currentPosition, possibleMoves });

    if (nextMove) {
      this.knight.move(nextMove);
      console.log(
        `Movendo o cavalo para: ${nextMove.getPosition().x} X ${
          nextMove.getPosition().y
        }`
      );

      return nextMove;
    } else {
      console.log('Não há mais movimentos válidos.');
      return null;
    }
  }

  public moveKnightUsingWarnsdorff(): IChessNode | null {
    const bestMove = this.knight.getBestMoveByWarnsdorff();

    if (bestMove) {
      this.knight.move(bestMove);
      console.log(
        `Movendo o cavalo para: ${bestMove.getPosition().x} X ${
          bestMove.getPosition().y
        }`
      );
      return bestMove;
    } else {
      console.log(
        'Não há mais movimentos válidos de acordo com a regra de Warnsdorff.'
      );
      return null;
    }
  }
}
