import { cards } from "@/configuration/cards";
import { useBoardState } from "@/hooks/useBoardState";
import { View, Text } from "react-native";

type BoardViewProps = {
  cardIndex: number;
};

export const BoardView = ({ cardIndex }: BoardViewProps) => {
  const card = cards[cardIndex];
  const board = useBoardState(card);

  return (
    <View>
      <Text>{JSON.stringify(board)}</Text>
    </View>
  );
};
