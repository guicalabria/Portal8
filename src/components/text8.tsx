import sumClass from "@/src/functions/sumClass";
import { Text as TextRN } from "react-native";
import { PageComponent } from "../interfaces";

export default function Text8({ component, classes }: {component: PageComponent, classes: any}) {
  return (
    <TextRN style={{ ...sumClass(component.classCss, classes), ...component.textStyle }}>
      {component.value}
    </TextRN>
  );
}
