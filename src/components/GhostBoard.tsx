import { useState, useEffect } from "react";
import { ScoreBoard } from "./ScoreBoard";
import type { CellContent } from "../types/GhostBoard.types";
import { BoardContainer, ButtonStyled, Container } from "./GhostBoard.styles";

const INITIAL_BOARD: CellContent[] = Array(9).fill(null);

export const GhostBoard: React.FC = () => {
  const [board, setBoard] = useState<CellContent[]>(INITIAL_BOARD);
  const [score, setScore] = useState<number>(0);

  const spawnGhost = () => {
    const newBoard: CellContent[] = Array(9).fill(null);
    const randomIndex = Math.floor(Math.random() * newBoard.length);
    newBoard[randomIndex] = "👻";
    setBoard(newBoard);

    setTimeout(() => {
      setBoard((prev) => prev.map((v, i) => (i === randomIndex ? null : v)));
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(spawnGhost, 2000);
    return () => clearInterval(interval);
  }, []);

  const catchGhost = (index: number) => {
    if (board[index]) {
      setScore((prev) => prev + 1);
      setBoard((prev) => prev.map((v, i) => (i === index ? null : v)));
    } else {
      alert("Not a ghost! Game over");
      setScore(0);
    }
  };

  return (
    <Container>
      <ScoreBoard score={score} />
      <BoardContainer>
        {board.map((cell, i) => (
          <ButtonStyled key={i} onClick={() => catchGhost(i)}>
            {cell || "❓"}
          </ButtonStyled>
        ))}
      </BoardContainer>
    </Container>
  );
};
