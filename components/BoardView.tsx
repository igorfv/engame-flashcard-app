import { cards } from "@/configuration/cards";
import { useCompactBoardState } from "@/hooks/useCompactBoardState";
import { View, Text } from "react-native";

type BoardViewProps = {
  cardIndex: number;
};

export const BoardView = ({ cardIndex }: BoardViewProps) => {
  const card = cards[cardIndex];
  const board = useCompactBoardState(card);

  return (
    <View>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((marker, colIndex) => (
            <View
              key={colIndex}
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  marker === "black"
                    ? "black"
                    : marker === "white"
                    ? "white"
                    : marker === "triangle"
                    ? "red"
                    : "transparent",
                borderWidth: 1,
                borderColor: "black",
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
