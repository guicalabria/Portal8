import { styles } from "@/src/constants/styles";
import sumClass from "@/src/functions/sumClass";
import { MultiSelect as DropdownMulti } from "react-native-element-dropdown";

export function MultiSelect8({ field, onValueChange, classes }: any) {
  return (
    <DropdownMulti
      itemTextStyle={styles.dropdown}
      selectedTextStyle={styles.dropdownMulti}
      placeholderStyle={styles.dropdown}
      style={{ ...sumClass(field.class, classes), ...field.style }}
      data={field.options}
      placeholder="Selecione"
      labelField="label"
      valueField="value"
      value={field.value}
      onChange={(e) => onValueChange(e)}
      mode="modal"
    />
  );
}
