import { PageComponent } from "@/src/interfaces";
import { Pressable, Text } from "react-native";
import sumClass from "@/src/functions/sumClass";

export function Button8({
  component,
  onLongPress,
  onPress,
  classes,
}: {
  component: PageComponent;
  onPress: any;
  classes: any;
  onLongPress: any;
}) {
  return (
    <Pressable onPress={() => onPress()} onLongPress={() => onLongPress()}>
      <Text
        style={{
          ...sumClass(component.classCss, classes),
          ...component.textStyle,
        }}
      >
        {component.label}
      </Text>
    </Pressable>
  );
}
