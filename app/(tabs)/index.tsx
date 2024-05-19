import { BoardView } from "@/components/BoardView";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BoardView card={0} />
    </View>
  );
}
