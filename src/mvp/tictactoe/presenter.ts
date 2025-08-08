import { useCallback, useMemo, useState } from "react";
import {
  Board,
  Player,
  GameStatus,
  createEmptyBoard,
  getStatus,
  makeMove,
  otherPlayer,
  getWinningCells,
} from "./model";

export interface PresenterState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winningCells: [number, number][] | null;
}

export interface PresenterOutputs extends PresenterState {
  onCellClick: (row: number, col: number) => void;
  onReset: () => void;
}

export const useTicTacToePresenter = (): PresenterOutputs => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const status = useMemo(() => getStatus(board, currentPlayer), [board, currentPlayer]);
  const winningCells = useMemo(() => getWinningCells(board), [board]);

  const onCellClick = useCallback(
    (row: number, col: number) => {
      if (status.type !== "ongoing") return; // game ended
      const { board: nextBoard, valid } = makeMove(board, row, col, currentPlayer);
      if (!valid) return;
      setBoard(nextBoard);
      setCurrentPlayer((p) => otherPlayer(p));
    },
    [board, currentPlayer, status.type]
  );

  const onReset = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  }, []);

  return {
    board,
    currentPlayer,
    status,
    winningCells,
    onCellClick,
    onReset,
  };
};
