// Cria um input de seleção para escolher uma entre opções pré estabelecidas
import { styles } from "@/src/constants/styles";
import { Dropdown } from "react-native-element-dropdown";
import { PageComponent } from "../interfaces";

export function Select8({
  component,
  onValueChange,
}: {
  component: PageComponent;
  onValueChange: any;
}) {
  return (
    <Dropdown
      itemTextStyle={styles.dropdown}
      selectedTextStyle={styles.dropdown}
      placeholderStyle={styles.dropdown}
      style={component.viewStyle}
      data={component.optionsItems ? component.optionsItems : []}
      placeholder="Selecione"
      labelField="label"
      valueField="value"
      value={component.value}
      onChange={(e) => onValueChange(e.value)}
      mode="modal"
    />
  );
}
