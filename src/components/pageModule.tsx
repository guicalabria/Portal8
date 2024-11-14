import { PageComponent } from "@/src/interfaces";
import { PageProperties } from "@/src/types";
import { Text, View } from "react-native";
import Input8 from "./fields/input";

export default function PageModule({navigation, page}:{navigation:any, page: PageProperties}) {
  const componentType:{[key:string]: any} = {
    input: (component:PageComponent) => <Input8 component={component} onValueChange={(e:any) => console.log(e)}/>
  }
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{page.name}</Text>
      {Object.keys(page.components).map((e)=> {
        return componentType[page.components[e].type](page.components[e])
      })}
    </View>
  );
}
