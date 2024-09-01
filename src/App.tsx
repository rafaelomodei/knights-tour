import React, { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Button } from './components/ui/button';
import ChessBoard from './ components/ChessBoard';
import { IChessNode } from './interfaces/ChessNode';
import { ChessBoardModel } from './models/ChessBoard';
import { KnightModel } from './models/Knight';
import { KnightService } from './services/KnightService';
import KnightLog from './ components/KnightLog';
import { Alert, AlertTitle } from './components/ui/alert';
import { TriangleAlert } from 'lucide-react';

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState<number>(8);
  const [algorithm, setAlgorithm] = useState<string>();
  const [board, setBoard] = useState<ChessBoardModel | null>(null);
  const [clickPosition, setClickPosition] = useState<IChessNode | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<IChessNode[]>([]);
  const [started, setStarted] = useState<boolean>(false);

  const [knight, setKnight] = useState<KnightModel | null>(null);

  useEffect(() => {
    if (!clickPosition || !board) return;

    if (!knight) {
      const knight = new KnightModel(clickPosition, board);
      setKnight(knight);
      setPossibleMoves(knight.getPossibleMoves());
      return;
    }

    const possibleMoves = knight.getPossibleMoves();

    if (!possibleMoves?.includes(clickPosition)) return;
    if (!started) return;

    knight.move(clickPosition);
    setPossibleMoves(knight.getPossibleMoves());
  }, [clickPosition]);

  useEffect(() => {
    const b = new ChessBoardModel(boardSize);
    setBoard(b);
    return;
  }, [boardSize]);

  const handleCLickStart = () => {
    setStarted(true);

    if (algorithm === 'BreadthFirstSearch' && knight) {
      const knightService = new KnightService(knight);

      const moveKnight = () => {
        if (!knight.isKnightTrapped()) {
          knightService.moveKnightUsingBFS();
          setPossibleMoves(knight.getPossibleMoves());

          setTimeout(moveKnight, 500);
        }
      };

      moveKnight();
    }
  };

  const handleAlert = () => {
    if (!clickPosition)
      return (
        <Alert className='w-72 mb-4 flex '>
          <TriangleAlert className='h-4 w-4 items-center justify-center' />
          <AlertTitle>Selecione uma casa para iniciar!</AlertTitle>
        </Alert>
      );

    if (!algorithm)
      return (
        <Alert className='w-72 mb-4 flex '>
          <TriangleAlert className='h-4 w-4 items-center justify-center' />
          <AlertTitle>Selecione um algoritimo!</AlertTitle>
        </Alert>
      );

    if (!started && algorithm && clickPosition)
      return (
        <Alert className='w-72 mb-4 flex '>
          <TriangleAlert className='h-4 w-4 items-center justify-center' />
          <AlertTitle>Clique no botão iniciar</AlertTitle>
        </Alert>
      );

    return (
      <Alert className='w-fit mb-4 flex '>
        <span className={` leading-4 text-lg text-zinc-100 pr-2`}>♞</span>
        <AlertTitle>É hora da cavalgada!</AlertTitle>
      </Alert>
    );
  };

  return (
    <div className='min-h-screen flex items-center justify-center gap-32 bg-zinc-950 text-white'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-3xl font-bold'>Problema do cavalo</h1>
        <p className='max-w-lg'>
          O problema do cavalo, ou passeio do cavalo, é um problema matemático
          envolvendo o movimento da peça do cavalo no tabuleiro de xadrez. O
          cavalo é colocado no tabuleiro vazio e, seguindo as regras do jogo,
          precisa passar por todas as casas exatamente uma vez em movimentos
          consecutivos.
        </p>

        <div className='w-full border-t border-gray-600 my-4' />

        {!started ? (
          <>
            <h2 className='text-2xl font-bold'>Configurações</h2>

            <div className='flex gap-8 justify-between'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold'>Tamanho do Tabuleiro</h2>
                <Select
                  value={`${boardSize}`}
                  onValueChange={(value) => setBoardSize(Number(value))}
                >
                  <SelectTrigger className='w-52'>
                    <SelectValue placeholder='Tamanho' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='4'>4 x 4</SelectItem>
                      <SelectItem value='5'>5 x 5</SelectItem>
                      <SelectItem value='6'>6 x 6</SelectItem>
                      <SelectItem value='7'>7 x 7</SelectItem>
                      <SelectItem value='8'>8 x 8</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2'>
                <h2 className='font-bold'>Selecione o algoritmo</h2>
                <Select onValueChange={(value) => setAlgorithm(value)}>
                  <SelectTrigger className='w-52'>
                    <SelectValue placeholder='Algoritmo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='BreadthFirstSearch'>
                        Busca em largura
                      </SelectItem>
                      <SelectItem value='IWantToTry'>
                        Eu quero tentar
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              disabled={!clickPosition || !boardSize || !algorithm}
              onClick={handleCLickStart}
            >
              Iniciar
            </Button>
          </>
        ) : (
          <KnightLog moveHistory={knight?.getMoveHistory()} />
        )}
      </div>
      <div className='flex flex-col items-center justify-center w-[550px]'>
        {handleAlert()}
        <ChessBoard
          board={board}
          goTo={setClickPosition}
          possibleMoves={possibleMoves}
          currentKnightPosition={knight?.getCurrentPosition() || null}
          isKnightTrapped={knight?.isKnightTrapped() || false}
        />
        <p className='text-sm'>{`Tamanho do tabuleiro (${boardSize} X ${boardSize})`}</p>
      </div>
    </div>
  );
};

export default App;
