import { IChessNode } from '@/interfaces/ChessNode';
import { useState } from 'react';

interface ChessSquareProps {
  isBlack: boolean;
  node: IChessNode;
  isPossibleMove: boolean;
  isCurrentPosition: boolean;
  isKnightTrapped?: boolean; // Novo prop para indicar se o cavalo está preso
  onClick: (node: IChessNode) => void;
}

const ChessSquare = (props: ChessSquareProps) => {
  const {
    isBlack,
    node,
    isPossibleMove,
    isCurrentPosition,
    isKnightTrapped,
    onClick,
  } = props;
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick(node);
  };

  const handleColor = (): string => {
    if (isCurrentPosition) {
      return isKnightTrapped ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-600 hover:bg-blue-700'; 
    }

    if (node.isVisited())
      return isBlack
        ? 'bg-zinc-700 hover:bg-zinc-800'
        : 'bg-zinc-400 hover:bg-zinc-500';

    if (isPossibleMove) return 'bg-green-600 hover:bg-green-700';


    return isBlack
      ? 'bg-zinc-900 hover:bg-zinc-950'
      : 'bg-zinc-100 hover:bg-zinc-300';
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-center items-center w-8 h-8 xl:w-16 xl:h-16 cursor-pointer ${handleColor()}`}
    >
      {isCurrentPosition ? (
        <span
          className={`text-3xl xl:text-5xl ${isBlack ? 'text-zinc-100' : 'text-zinc-900'}`}
        >
          ♞
        </span>
      ) : node.isVisited() ? (
        <span
          className={`text-xl xl:text-2xl ${isBlack ? 'text-zinc-100' : 'text-zinc-900'}`}
        >
          X
        </span>
      ) : null}
    </div>
  );
};

export { ChessSquare };
