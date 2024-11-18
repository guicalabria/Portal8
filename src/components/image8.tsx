import sumClass from "@/src/functions/sumClass";
import { useEffect, useState } from "react";
import { Image as ImageRN, Pressable, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import generateRandomAlphanumeric from "@/src/functions/generateRandomAlphanumeric";

export function Image8({ field, classes, setToken }: any) {
  const [imageUri, setImageUri] = useState(null);
  const fileUri: any = `${FileSystem.documentDirectory}${field.token}.jpg`;

  useEffect(() => {
    console.log(field.token);
    if (!field.token) {
      setToken(generateRandomAlphanumeric(20));
    }
    checkIfFileExists();
  }, []);

  const downloadImage = async () => {
    try {
      const { uri }: any = await FileSystem.downloadAsync(
        field.source,
        fileUri
      );
      setImageUri(uri);
      console.log("Image downloaded to:", uri);
    } catch (error) {
      console.log("Error downloading image:", error);
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
          // source={{ uri: field.source }}
          source={{ uri: imageUri }}
          style={{ ...sumClass(field.class, classes), ...field.style }}
        />
      ) : (
        <Text>Nenhuma imagem baixada.</Text>
      )}
    </View>
  );
}
