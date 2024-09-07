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
import { TriangleAlert, Sparkles, BringToFront, Brain } from 'lucide-react';
import { useGemini } from './hooks/useGemini';
import { parseCoordinates } from './utils/ParseCoordinates';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState<number>(8);
  const [algorithm, setAlgorithm] = useState<string>();
  const [board, setBoard] = useState<ChessBoardModel | null>(null);
  const [clickPosition, setClickPosition] = useState<IChessNode | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<IChessNode[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [knight, setKnight] = useState<KnightModel | null>(null);

  const { response, error, fetchResponse } = useGemini();

  useEffect(() => {
    if (algorithm !== 'gemini') return;

    const node = board?.getNodeAt(parseCoordinates(response));
    if (node && knight) {
      knight.move(node);
      setPossibleMoves(knight.getPossibleMoves());
    }
  }, [response]);

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

  const handleCLickStart = async () => {
    if (started) return window.location.reload();

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

    if (algorithm === 'BreadthFirstSearchWarnsdorff' && knight) {
      const knightService = new KnightService(knight);

      const moveKnight = () => {
        if (!knight.isKnightTrapped()) {
          knightService.moveKnightUsingWarnsdorff();
          setPossibleMoves(knight.getPossibleMoves());

          setTimeout(moveKnight, 500);
        }
      };

      moveKnight();
    }

    if (algorithm === 'gemini' && knight) {
      const moveKnight = async () => {
        if (knight.isKnightTrapped() || error) return;

        await fetchResponse(
          `Você está resolvendo o problema do cavalo (Knight's Tour) em um tabuleiro de xadrez, onde o cavalo deve percorrer todas as casas sem repetir nenhuma. Abaixo estão os detalhes do tabuleiro, com as casas marcadas como visitadas ou não. Tabuleiro: ${board?.getBoardToString()} \n Movimentos Possíveis. O cavalo pode se mover para as seguintes posições: ${knight?.getPossibleMovesToString()} \n seja breve e responda somente uma das opção de movimento`
        );

        await sleep(5000);
        moveKnight();
      };

      moveKnight();
    }
  };

  const handleAlert = () => {
    if (!clickPosition)
      return (
        <Alert className='w-fit mb-4 flex text-sm'>
          <TriangleAlert className='h-4 w-4' />
          <AlertTitle>Selecione uma casa para iniciar!</AlertTitle>
        </Alert>
      );

    if (!algorithm)
      return (
        <Alert className='w-fit mb-4 flex text-sm'>
          <TriangleAlert className='h-4 w-4 items-center justify-center' />
          <AlertTitle>Selecione um algoritimo!</AlertTitle>
        </Alert>
      );

    if (!started && algorithm && clickPosition)
      return (
        <Alert className='w-fit mb-4 flex text-sm'>
          <TriangleAlert className='h-4 w-4 items-center justify-center' />
          <AlertTitle>Clique no botão iniciar</AlertTitle>
        </Alert>
      );

    return (
      <Alert className='w-fit mb-4 flex text-sm'>
        <span className={` leading-4 text-lg text-zinc-100 pr-2`}>♞</span>
        <AlertTitle>É hora da cavalgada!</AlertTitle>
      </Alert>
    );
  };

  return (
    <div className='min-h-screen flex items-center justify-center gap-16 xl:gap-32 bg-zinc-950 text-white flex-col xl:flex-row p-8'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-xl xl:text-3xl font-bold'>Problema do cavalo</h1>
        <p className='max-w-lg text-sm xl:text-md'>
          O problema do cavalo, ou passeio do cavalo, é um problema matemático
          envolvendo o movimento da peça do cavalo no tabuleiro de xadrez. O
          cavalo é colocado no tabuleiro vazio e, seguindo as regras do jogo,
          precisa passar por todas as casas exatamente uma vez em movimentos
          consecutivos.
        </p>

        <div className='w-full border-t border-gray-600 my-1  xl:my-4' />

        {!started ? (
          <>
            <h2 className='text-lg xl:text-2xl  font-bold'>Configurações</h2>

            <div className='flex gap-8 justify-between flex-col xl:flex-row'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-sm xl:text-lg'>
                  Tamanho do Tabuleiro
                </h2>
                <Select
                  value={`${boardSize}`}
                  onValueChange={(value) => setBoardSize(Number(value))}
                >
                  <SelectTrigger className='w-full xl:w-52 '>
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
                <h2 className='font-bold text-sm xl:text-lg'>
                  Selecione o algoritmo
                </h2>
                <Select onValueChange={(value) => setAlgorithm(value)}>
                  <SelectTrigger className='w-full xl:w-52 '>
                    <SelectValue placeholder='Algoritmo' />
                  </SelectTrigger>
                  <SelectContent className='max-w-xs'>
                    <SelectGroup>
                      <SelectItem value='BreadthFirstSearch'>
                        <div className='flex gap-2  items-center'>
                          <BringToFront className='h-4 w-4' />{' '}
                          <p>Busca em largura</p>
                        </div>
                      </SelectItem>
                      <SelectItem value='BreadthFirstSearchWarnsdorff'>
                        <div className='flex gap-2  items-center'>
                          <BringToFront className='h-4 w-4' />{' '}
                          <p>Busca em largura - Warnsdorff</p>
                        </div>
                      </SelectItem>
                      <SelectItem value='gemini'>
                        <div className='flex flex-col'>
                          <div className='flex  gap-2  items-center'>
                            <Sparkles className='h-4 w-4' />
                            <p>Gemini</p>
                          </div>
                          {algorithm !== 'gemini' && (
                            <p className='text-red-400 font-bold text-xs'>
                              Os tokens do Gemini são limitados, pode ser que
                              não consiga resolver o problema.
                            </p>
                          )}
                        </div>
                      </SelectItem>
                      <SelectItem value='IWantToTry'>
                        <div className='flex gap-2  items-center'>
                          <Brain className='h-4 w-4' /> Eu quero tentar
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {algorithm === 'gemini' && (
              <p className='text-red-400 font-bold text-xs text-start xl:text-center'>
                O tempo de movimentação do Gemini é de 5 segunstos.
              </p>
            )}
            <Button
              className='hidden xl:flex'
              disabled={!clickPosition || !boardSize || !algorithm}
              onClick={handleCLickStart}
            >
              {started ? 'Reiniciar' : 'Iniciar'}
            </Button>
          </>
        ) : (
          <KnightLog moveHistory={knight?.getMoveHistory()} />
        )}
      </div>
      <div className='flex flex-col items-center justify-center w-full xl:w-[550px]'>
        {handleAlert()}

        <ChessBoard
          board={board}
          goTo={setClickPosition}
          possibleMoves={possibleMoves}
          currentKnightPosition={knight?.getCurrentPosition() || null}
          isKnightTrapped={knight?.isKnightTrapped() || false}
        />
        <p className='text-sm'>{`Tamanho do tabuleiro (${boardSize} X ${boardSize})`}</p>
        {algorithm === 'gemini' && (
          <p className='text-red-400 font-bold text-xs text-start xl:text-center xl:hidden'>
            O tempo de movimentação do Gemini é de 5 segunstos.
          </p>
        )}
      </div>

      <Button
        className='flex w-full max-w-lg  xl:hidden'
        disabled={!clickPosition || !boardSize || !algorithm}
        onClick={handleCLickStart}
      >
        {started ? 'Reiniciar' : 'Iniciar'}
      </Button>
    </div>
  );
};

export default App;
