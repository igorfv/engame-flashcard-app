import sgf from "sgfjs";
import { Card } from "@/configuration/cards";
import { useMemo } from "react";

const firstCharCode = "a".charCodeAt(0);

type markers = "black" | "white" | "triangle" | null;
type BoardState = Array<Array<markers>>;

const codeToMarker: Record<string, string> = {
  AB: "black",
  AW: "white",
  TR: "triangle",
};

type CodeToMarker = typeof codeToMarker;

export const useCompactBoardState = (card: Card): BoardState => {
  const game = useMemo(() => sgf.parse(card.sgf), [card.sgf]);

  const board = useMemo(() => {
    const board = new Array(19).fill(null).map(() => new Array(19).fill(null));

    Object.keys(codeToMarker).forEach((code: keyof CodeToMarker) => {
      let points = game.props[code];
      if (typeof points === "string") points = [points];

      points?.forEach((point: string) => {
        const x = point.charCodeAt(0) - firstCharCode;
        const y = point.charCodeAt(1) - firstCharCode;
        board[x][y] = codeToMarker[code];
      });
    });

    return board;
  }, [game]);

  const cleanBoard = useMemo(() => {
    let cleanBoard = JSON.parse(JSON.stringify(board));

    // Remove empty rows
    for (let rowIndex = 0; rowIndex < 19; rowIndex++) {
      let isRowEmpty = true;
      for (let colIndex = 0; colIndex < 19; colIndex++) {
        const item = cleanBoard?.[rowIndex]?.[colIndex];
        if (!!item) {
          isRowEmpty = false;
          break;
        }
      }

      if (isRowEmpty) cleanBoard[rowIndex] = null;
    }
    cleanBoard = cleanBoard.filter((row: Array<markers>) => row !== null);

    // Remove empty columns
    const columnsToBeRemoved = [];
    for (let column = 0; column < 19; column++) {
      let isColumnEmpty = true;

      cleanBoard.forEach((row: Array<markers>) => {
        if (!!row[column]) {
          isColumnEmpty = false;
        }
      });

      if (isColumnEmpty) {
        columnsToBeRemoved.push(column);
      }
    }
    columnsToBeRemoved.reverse().forEach((column) => {
      cleanBoard.forEach((row: Array<markers>) => {
        row.splice(column, 1);
      });
    });

    return cleanBoard;
  }, [board]);

  return cleanBoard;
};
