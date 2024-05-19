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

export const useBoardState = (card: Card): BoardState => {
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

    // Remove empty columns
    for (let i1 = 0; i1 < 19; i1++) {
      let isEmpty = true;
      for (let i2 = 0; i2 < 19; i2++) {
        const item = cleanBoard?.[i1]?.[i2];
        if (!!item) {
          isEmpty = false;
          break;
        }
      }

      if (isEmpty) cleanBoard[i1] = null;
    }

    cleanBoard = cleanBoard.filter(
      (column: any) => column !== null && column?.some((item: any) => !!item)
    );

    return cleanBoard;
  }, [board]);

  return cleanBoard;
};
