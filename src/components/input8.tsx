// Componente de input de texto
import sumClass from "@/src/functions/sumClass";
import { PageComponent } from "@/src/interfaces";
import { TextInput } from "react-native";

export function Input8({
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
