import { IPosition } from '@/interfaces/ChessNode';

const parseCoordinates = (input: string): IPosition => {
  const [x, y] = input
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);

  return { x, y };
};

export { parseCoordinates };
