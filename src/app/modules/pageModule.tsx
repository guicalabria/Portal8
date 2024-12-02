// Estrutura a página, lendo os componentes e renderizando conforme necessário
import { PageComponent } from "@/src/interfaces";
import { PageProperties } from "@/src/types";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
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
  TextArea8,
} from "@/src/components";
import Text8 from "@/src/components/text8";

export default function PageModule({
  navigation,
  page,
  classes,
  onValueChange,
  setToken,
}: {
  navigation: any;
  page: PageProperties;
  classes: any;
  setToken: any;
  onValueChange: any;
}) {
  const componentType: { [key: string]: any } = {
    button: (component: PageComponent, key: string) => (
      <Button8
        component={component}
        onPress={() => console.log(component)}
        onLongPress={() => console.log(key)}
        classes={classes}
        key={key}
      />
    ),
    checkBox: (component: PageComponent, key: string) => (
      <CheckBox8
        classes={classes}
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        key={key}
      />
    ),
    date: (component: PageComponent, key: string) => (
      <Date8
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        key={key}
      />
    ),
    dateInterval: (component: PageComponent, key: string) => (
      <DateInterval8 key={key} />
    ),
    file: (component: PageComponent, key: string) => (
      <File8
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        key={key}
      />
    ),
    image: (component: PageComponent, key: string) => (
      <Image8
        classes={classes}
        component={component}
        setToken={(token: string) => setToken(token, key)}
        key={key}
      />
    ),
    select: (component: PageComponent, key: string) => (
      <Select8
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        key={key}
      />
    ),
    multiSelect: (component: PageComponent, key: string) => (
      <MultiSelect8
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        classes={classes}
        key={key}
      />
    ),
    sound: (component: PageComponent, key: string) => (
      <Sound8 classes={classes} component={component} key={key} />
    ),
    table: (component: PageComponent, key: string) => <Table8 key={key} />,
    text: (component: PageComponent, key: string) => (
      <Text8 classes={classes} component={component} key={key} />
    ),
    textArea: (component: PageComponent, key: string) => (
      <TextArea8
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        key={key}
        classes={classes}
      />
    ),
    video: (component: PageComponent, key: string) => (
      <Video8 component={component} key={key} />
    ),
    input: (component: PageComponent, key: string) => (
      <Input8
        component={component}
        onValueChange={(e: any) => onValueChange(e, key)}
        key={key}
        classes={classes}
      />
    ),
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{page.name}</Text>
        {Object.keys(page.components).map((e) => {
          if (componentType[page.components[e].type]){
            return componentType[page.components[e].type](page.components[e], e);
          }
          else {
            console.error("Tipo não existe")
            return;
          }
        })}
      </View>
    </KeyboardAvoidingView>
  );
}
