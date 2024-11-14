import { Text, View, Pressable } from "react-native";

export default function Index({navigation}:any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable onPress={() => navigation.navigate("home")}>
        <Text>
          Navegar
        </Text>
      </Pressable>
    </View>
  );
}