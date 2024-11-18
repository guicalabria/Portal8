import { PageComponent } from "@/src/interfaces";
import { PageProperties } from "@/src/types";
import { Text, View } from "react-native";
import {
  Button8,
  CheckBox8,
  Date8,
  DateInterval8,
  File8,
  Image8,
  Input8,
  MultiSelect8,
  Select8,
  Sound8,
  Table8,
  Video8,
} from "@/src/components";
import Text8 from "@/src/components/text8";
import TextArea8 from "@/src/components/textArea8";
export default function PageModule({
  navigation,
  page,
  classes,
}: {
  navigation: any;
  page: PageProperties;
  classes: any;
}) {
  const componentType: { [key: string]: any } = {
    button: (component: PageComponent, key: string) => (
      <Button8
        component={component}
        onPress={() => console.log(component)}
        onLongPress={() => console.log(key)}
        classes={classes}
      />
    ),
    checkBox: (component: PageComponent, key: string) => (
      <CheckBox8
        classes={classes}
        component={component}
        onValueChange={(e: boolean) => console.log(e)}
      />
    ),
    date: (component: PageComponent, key: string) => <Date8 />,
    dateInterval: (component: PageComponent, key: string) => <DateInterval8 />,
    file: (component: PageComponent, key: string) => <File8 />,
    image: (component: PageComponent, key: string) => <Image8 />,
    select: (component: PageComponent, key: string) => <Select8 />,
    multiSelect: (component: PageComponent, key: string) => <MultiSelect8 />,
    sound: (component: PageComponent, key: string) => <Sound8 />,
    table: (component: PageComponent, key: string) => <Table8 />,
    text: (component: PageComponent, key: string) => <Text8 />,
    textArea: (component: PageComponent, key: string) => <TextArea8 />,
    video: (component: PageComponent, key: string) => <Video8 />,

    input: (component: PageComponent, key: string) => (
      <Input8
        component={component}
        onValueChange={(e: string) => console.log(e)}
        key={key}
        classes={classes}
      />
    ),
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{page.name}</Text>
      {Object.keys(page.components).map((e) => {
        return componentType[page.components[e].type](page.components[e], e);
      })}
    </View>
  );
}
