import { PageComponent } from "@/src/interfaces";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { TextInput } from "react-native";

export default function Input8({component, onValueChange }:{component:PageComponent, onValueChange: any}){
  return(
    <TextInput
      value={component.masks ? component.valueMasked : component.value}
      inputMode={component.inputMode}
      editable={component.isEditable}
      placeholder={component.placeholder}
      maxLength={component.maxLength}
      style={{...component.textStyle}}
      onChangeText={(e) => {
        onValueChange(e)
      }}
    />
  )
}