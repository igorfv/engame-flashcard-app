type Cards = Card[];

type Card = {
  sgf: string;
  points: number;
  type: "gote" | "sente" | "doublesente";
};

export const cards: Cards = [
  {
    sgf: "(;GM[1]FF[4]AB[rh][rj][qj]AW[qk][rk][rm]TR[sk])",
    points: 2,
    type: "gote",
  },
];
