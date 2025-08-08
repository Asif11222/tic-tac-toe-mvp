export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[][]; // 3x3

export type GameStatus =
  | { type: "ongoing"; nextPlayer: Player }
  | { type: "win"; winner: Player }
  | { type: "draw" };

export const createEmptyBoard = (): Board => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

export const makeMove = (
  board: Board,
  row: number,
  col: number,
  player: Player
): { board: Board; valid: boolean } => {
  if (board[row][col] !== null) return { board, valid: false };
  const next = cloneBoard(board);
  next[row][col] = player;
  return { board: next, valid: true };
};

export const checkWinner = (board: Board): Player | null => {
  const lines: { cells: [number, number][]; values: Cell[] }[] = [
    { cells: [[0, 0], [0, 1], [0, 2]], values: [board[0][0], board[0][1], board[0][2]] },
    { cells: [[1, 0], [1, 1], [1, 2]], values: [board[1][0], board[1][1], board[1][2]] },
    { cells: [[2, 0], [2, 1], [2, 2]], values: [board[2][0], board[2][1], board[2][2]] },
    { cells: [[0, 0], [1, 0], [2, 0]], values: [board[0][0], board[1][0], board[2][0]] },
    { cells: [[0, 1], [1, 1], [2, 1]], values: [board[0][1], board[1][1], board[2][1]] },
    { cells: [[0, 2], [1, 2], [2, 2]], values: [board[0][2], board[1][2], board[2][2]] },
    { cells: [[0, 0], [1, 1], [2, 2]], values: [board[0][0], board[1][1], board[2][2]] },
    { cells: [[0, 2], [1, 1], [2, 0]], values: [board[0][2], board[1][1], board[2][0]] },
  ];

  for (const line of lines) {
    const [a, b, c] = line.values;
    if (a && a === b && b === c) return a;
  }
  return null;
};

export const getWinningCells = (board: Board): [number, number][] | null => {
  const lines: { cells: [number, number][]; values: Cell[] }[] = [
    { cells: [[0, 0], [0, 1], [0, 2]], values: [board[0][0], board[0][1], board[0][2]] },
    { cells: [[1, 0], [1, 1], [1, 2]], values: [board[1][0], board[1][1], board[1][2]] },
    { cells: [[2, 0], [2, 1], [2, 2]], values: [board[2][0], board[2][1], board[2][2]] },
    { cells: [[0, 0], [1, 0], [2, 0]], values: [board[0][0], board[1][0], board[2][0]] },
    { cells: [[0, 1], [1, 1], [2, 1]], values: [board[0][1], board[1][1], board[2][1]] },
    { cells: [[0, 2], [1, 2], [2, 2]], values: [board[0][2], board[1][2], board[2][2]] },
    { cells: [[0, 0], [1, 1], [2, 2]], values: [board[0][0], board[1][1], board[2][2]] },
    { cells: [[0, 2], [1, 1], [2, 0]], values: [board[0][2], board[1][1], board[2][0]] },
  ];
  for (const line of lines) {
    const [a, b, c] = line.values;
    if (a && a === b && b === c) return line.cells;
  }
  return null;
};

export const isDraw = (board: Board): boolean =>
  board.flat().every((cell) => cell !== null);

export const getStatus = (board: Board, nextPlayer: Player): GameStatus => {
  const winner = checkWinner(board);
  if (winner) return { type: "win", winner };
  if (isDraw(board)) return { type: "draw" };
  return { type: "ongoing", nextPlayer };
};

export const otherPlayer = (p: Player): Player => (p === "X" ? "O" : "X");
