import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IChessEdge } from '@/interfaces/ChessEdge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KnightLogProps {
  moveHistory?: IChessEdge[];
}

const KnightLog: React.FC<KnightLogProps> = ({ moveHistory }) => {
  return (
    <ScrollArea className='h-52'>
      <Table className='min-w-full'>
        <TableHeader>
          <TableRow >
            <TableHead className='!text-white font-bold'>Movimento</TableHead>
            <TableHead className='!text-white font-bold'>De</TableHead>
            <TableHead className='!text-white font-bold'>Para</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moveHistory?.map((move, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{`(${move.from.getPosition().x}, ${
                move.from.getPosition().y
              })`}</TableCell>
              <TableCell>{`(${move.to.getPosition().x}, ${
                move.to.getPosition().y
              })`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default KnightLog;
