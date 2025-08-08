import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Board, Player, GameStatus } from "@/mvp/tictactoe/model";

export interface TicTacToeViewProps {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  onCellClick: (row: number, col: number) => void;
  onReset: () => void;
}

const StatusBadge: React.FC<{ status: GameStatus }> = ({ status }) => {
  if (status.type === "win") {
    return (
      <span className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1 text-sm text-accent-foreground">
        Winner: {status.winner}
      </span>
    );
  }
  if (status.type === "draw") {
    return (
      <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1 text-sm text-secondary-foreground">
        It's a draw
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
      Your turn: {status.nextPlayer}
    </span>
  );
};

export const TicTacToeView: React.FC<TicTacToeViewProps> = ({
  board,
  currentPlayer,
  status,
  onCellClick,
  onReset,
}) => {
  useEffect(() => {
    if (status.type !== 'win') return;
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    gain.connect(ctx.destination);

    const makeTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(gain);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    makeTone(523.25, 0, 0.15);
    makeTone(659.25, 0.15, 0.15);
    makeTone(783.99, 0.3, 0.25);
    makeTone(1046.5, 0.55, 0.35);

    const timeout = setTimeout(() => ctx.close(), 1200);
    return () => {
      clearTimeout(timeout);
      ctx.close();
    };
  }, [status.type]);

  return (
    <article aria-label="Tic Tac Toe Game" className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Tic Tac Toe</h2>
        <StatusBadge status={status} />
      </div>

      <div
        role="grid"
        aria-label="game board"
        className="grid grid-cols-3 gap-3"
      >
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const label = cell ? `Cell ${rIdx + 1}-${cIdx + 1}: ${cell}` : `Cell ${rIdx + 1}-${cIdx + 1}: empty`;
            const disabled = cell !== null || status.type !== "ongoing";
            return (
              <button
                key={`${rIdx}-${cIdx}`}
                role="gridcell"
                aria-label={label}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => onCellClick(rIdx, cIdx)}
                className="h-20 w-20 md:h-24 md:w-24 rounded-lg border bg-card text-2xl font-bold text-foreground hover:bg-accent hover:text-accent-foreground transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center select-none"
              >
                {cell ?? ""}
              </button>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Current Player: <span className="font-semibold">{currentPlayer}</span>
        </p>
        <Button variant={status.type === "ongoing" ? "outline" : "hero"} onClick={onReset}>
          {status.type === "ongoing" ? "Reset" : "Play again"}
        </Button>
      </div>
    </article>
  );
};

export default TicTacToeView;
