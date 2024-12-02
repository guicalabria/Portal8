// Cria um botão para buscar um arquivo no celular e ser carregado no programa.
import { Text, Pressable } from "react-native";
import { styles } from "@/src/constants/styles";
import * as DocumentPicker from "expo-document-picker";
import { PageComponent } from "../interfaces";

export function File8({
  component,
  onValueChange,
}: {
  component: PageComponent;
  onValueChange: any;
}) {
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
      <Text style={styles.buttonTextFile}>{component.label}</Text>
    </Pressable>
  );
}
