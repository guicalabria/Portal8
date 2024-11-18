import { TextInput } from "react-native";
import sumClass from "@/src/functions/sumClass";

export default function TextArea8({ field, onValueChange, classes }: any) {
  return (
    <TextInput
      multiline
      style={{ ...sumClass(field.class, classes), ...field.style }}
      value={field ? field.value : null}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      onChangeText={(e) => onValueChange(e)}
    />
  );
}
