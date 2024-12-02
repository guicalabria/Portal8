// Cria um componente de imagem, e gera um token para guardar no armazenamento interno do celular, e ser recuperado para ser acessado novamente sem a necessidade de baixar novamente ou até mesmo offline
import sumClass from "@/src/functions/sumClass";
import { useEffect, useState } from "react";
import { Image as ImageRN, Pressable, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import generateRandomAlphanumeric from "@/src/functions/generateRandomAlphanumeric";
import { PageComponent } from "../interfaces";

export function Image8({
  component,
  classes,
  setToken,
}: {
  component: PageComponent;
  classes: any;
  setToken: any;
}) {
  const [imageUri, setImageUri] = useState(null);
  const fileUri: any = `${FileSystem.documentDirectory}${component.token}.jpg`;

  useEffect(() => {
    console.log(component.token);
    if (!component.token) {
      setToken(generateRandomAlphanumeric(20));
    }
    checkIfFileExists();
  }, []);

  const downloadImage = async () => {
    if(component.sourceURL){
      try {
        const { uri }: any = await FileSystem.downloadAsync(
          component.sourceURL,
          fileUri
        );
        setImageUri(uri);
        console.log("Image downloaded to:", uri);
      } catch (error) {
        console.log("Error downloading image:", error);
      }
    }

  };

  const checkIfFileExists = async () => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      setImageUri(fileUri); // Se o arquivo já existe, use-o
      console.log("Image already exists locally:", fileUri);
    } else {
      console.log("File does not exist, downloading...");
      downloadImage();
    }
  };

  return (
    <View>
      {imageUri ? (
        <ImageRN
          // source={{ uri: component.source }}
          source={{ uri: imageUri }}
          style={{
            ...sumClass(component.classCss, classes),
            ...component.imageStyle,
          }}
        />
      ) : (
        <Text>Nenhuma imagem baixada.</Text>
      )}
    </View>
  );
}
