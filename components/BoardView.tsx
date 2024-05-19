import { View, Text } from "react-native";
import sgf from "sgfjs";
import { cards } from "@/configuration/cards";

type BoardViewProps = {
  card: number;
};

export const BoardView = ({ card }: BoardViewProps) => {
  const selectedCard = cards[card];
  const game = sgf.parse(selectedCard.sgf);

  return (
    <View>
      <Text>{JSON.stringify(game)}</Text>
    </View>
  );
};
