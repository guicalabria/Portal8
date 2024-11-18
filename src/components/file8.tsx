import { Text, Pressable } from "react-native";
import { styles } from "@/src/constants/styles";
import * as DocumentPicker from "expo-document-picker";

export function File8({ field, onValueChange }: any) {
  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      console.log(docRes.assets && docRes.assets[0]);
      onValueChange(docRes.assets && docRes.assets[0].name);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  return (
    <Pressable style={styles.buttonFile} onPress={pickSomething}>
      <Text style={styles.buttonTextFile}>{field.buttonText}</Text>
    </Pressable>
  );
}
