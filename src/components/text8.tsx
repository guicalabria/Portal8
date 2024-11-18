import sumClass from "@/src/functions/sumClass";
import { Text as TextRN } from "react-native";

export default function Text8({ field, classes }: any) {
  return (
    <TextRN style={{ ...sumClass(field.class, classes), ...field.style }}>
      {field.value}
    </TextRN>
  );
}
