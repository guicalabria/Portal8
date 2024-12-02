// cria um componente de checkbox, ele retorna os valores de true e false
import sumClass from "@/src/functions/sumClass";
import { PageComponent } from "@/src/interfaces";
import CheckBox from "expo-checkbox";

export function CheckBox8({
  component,
  onValueChange,
  classes,
}: {
  component: PageComponent;
  onValueChange: any;
  classes: any;
}) {
  return (
    <CheckBox
        style={{
          ...sumClass(component.classCss, classes),
          ...component.viewStyle,
        }}
      value={component.value}
      onValueChange={(e) => onValueChange(e)}
    />
  );
}
