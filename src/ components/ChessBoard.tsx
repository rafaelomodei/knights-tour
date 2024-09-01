import { ChessSquare } from './ChessSquare';
import { IChessNode } from '@/interfaces/ChessNode';
import { ChessBoardModel } from '@/models/ChessBoard';
import { Dispatch } from 'react';

interface ChessBoardProps {
  board: ChessBoardModel | null;
  possibleMoves: IChessNode[];
  isKnightTrapped?: boolean;
  goTo: Dispatch<React.SetStateAction<IChessNode | null>>;
  currentKnightPosition: IChessNode | null; // Nova prop para a posição atual do cavalo
}

const ChessBoard = (props: ChessBoardProps) => {
  const { board, possibleMoves, goTo, currentKnightPosition, isKnightTrapped } =
    props;

  const boardNodes = board?.getBoard().map((row, rowIndex) => {
    const squares = row.map((node, colIndex) => {
      const position = node.getPosition();
      const isBlack = (position.x + position.y) % 2 === 1;
      const isPossibleMove = Boolean(possibleMoves?.includes(node));
      const isCurrentPosition = node === currentKnightPosition; // Verifica se é a posição atual do cavalo

      return (
        <ChessSquare
          key={`${rowIndex}-${colIndex}`}
          isBlack={isBlack}
          node={node}
          isPossibleMove={isPossibleMove}
          isCurrentPosition={isCurrentPosition}
          isKnightTrapped={isKnightTrapped}
          onClick={(clickedNode) => goTo(clickedNode)}
        />
      );
    });

    return (
      <div key={rowIndex} className='flex'>
        {squares}
      </div>
    );
  });

  return (
    <div className='inline-block border-zinc-600 border-8 rounded-sm'>
      {boardNodes}
    </div>
  );
};

export default ChessBoard;
