import { useEffect, useMemo, useState } from "react";
import { useTicTacToePresenter } from "@/mvp/tictactoe/presenter";
import TicTacToeView from "@/components/TicTacToeView";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { board, currentPlayer, status, onCellClick, onReset, winningCells } = useTicTacToePresenter();

  // SEO
  useEffect(() => {
    const title = "Tic Tac Toe MVP – Model • View • Presenter";
    const desc = "Play a polished Tic Tac Toe built with the MVP pattern (Model, View, Presenter).";
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      m.setAttribute("content", desc);
      document.head.appendChild(m);
    }
    const canonicalHref = window.location.origin + window.location.pathname;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalHref;
  }, []);

  // Signature moment: subtle pointer-follow glow in the hero
  const [pos, setPos] = useState<{x:number;y:number}>({x:0,y:0});
  const glowStyle = useMemo(() => ({
    background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, hsl(var(--ring) / 0.15), transparent 40%)`
  }), [pos]);

  return (
    <>
      <header className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={glowStyle}
        />
        <div
          onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
          className="container py-16 md:py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Tic Tac Toe MVP
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A clean separation of concerns: Model for game state, View for UI, Presenter for logic.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button variant="hero" size="lg" onClick={onReset}>New Game</Button>
              <Button variant="outline" size="lg" onClick={onReset}>Reset</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container pb-24">
        <section aria-labelledby="game-section" className="mx-auto max-w-5xl">
          <h2 id="game-section" className="sr-only">Play Tic Tac Toe</h2>
          <TicTacToeView
            board={board}
            currentPlayer={currentPlayer}
            status={status}
            winningCells={winningCells}
            onCellClick={onCellClick}
            onReset={onReset}
          />
        </section>
      </main>
    </>
  );
};

export default Index;
