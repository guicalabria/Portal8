// Componente que gera um input para fazer multiplas seleções pré estabelecidas
import { styles } from "@/src/constants/styles";
import sumClass from "@/src/functions/sumClass";
import { MultiSelect as DropdownMulti } from "react-native-element-dropdown";
import { PageComponent } from "../interfaces";

export function MultiSelect8({
  component,
  onValueChange,
  classes,
}: {
  component: PageComponent;
  classes: any;
  onValueChange: any;
}) {
  return (
    <DropdownMulti
      itemTextStyle={styles.dropdown}
      selectedTextStyle={styles.dropdownMulti}
      placeholderStyle={styles.dropdown}
      style={{ ...sumClass(component.classCss, classes), ...component.viewStyle }}
      data={component.optionsItems ? component.optionsItems : []}
      placeholder="Selecione"
      labelField="label"
      valueField="value"
      value={component.value}
      onChange={(e) => onValueChange(e)}
      mode="modal"
    />
  );
}
