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
  const lines = [
    // rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // cols
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const [a, b, c] of lines) {
    if (a && a === b && b === c) return a;
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
