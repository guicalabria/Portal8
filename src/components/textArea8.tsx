// cria um input para conter multilinhas, como por exemplo, um campo de observação
import sumClass from "@/src/functions/sumClass";
import { PageComponent } from "@/src/interfaces";
import { TextInput } from "react-native";

export function TextArea8({
  component,
  onValueChange,
  classes,
}: {
  component: PageComponent;
  onValueChange: any;
  classes: any;
}) {
  return (
    <TextInput
      value={component.masks ? component.valueMasked : component.value}
      inputMode={component.inputMode}
      editable={component.isEditable}
      placeholder={component.placeholder}
      maxLength={component.maxLength}
      multiline
      style={{
        ...sumClass(component.classCss, classes),
        ...component.textStyle,
      }}
      onChangeText={(e) => {
        onValueChange(e);
      }}
    />
  );
}
