// Cria um componente para ouvir um arquivo de audio
import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { PageComponent } from "../interfaces";

export function Sound8({
  component,
  classes,
}: {
  component: PageComponent;
  classes: any;
}) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (sound) {
      // Se já houver um som carregado e tocando, vamos pausar
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      // Carregar som a partir de uma URL
      if (component.sourceURL) {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync({
          uri: component.sourceURL,
        });
        setSound(sound);

        console.log("Playing Sound");
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  async function pauseSound() {
    if (sound) {
      console.log("Pausing Sound");
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={isPlaying ? pauseSound : playSound}
      >
        <Ionicons name={isPlaying ? "pause" : "play"} size={18} color="white" />
      </Pressable>
    </View>
  );}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
    alignItems: "center",
  },
  button: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
