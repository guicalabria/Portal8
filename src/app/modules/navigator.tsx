import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProgramProperties } from "@/src/types";
import ModuleNavigation from "./moduleNavigator";

const Drawer = createDrawerNavigator();

export default function Portal8Navigator({
  navigation,
  portal8,
  setPortal8,
}: {
  navigation: any;
  portal8: ProgramProperties;
  setPortal8: React.Dispatch<React.SetStateAction<ProgramProperties>>;
}) {
  return (
    <Drawer.Navigator>
      {Object.keys(portal8.modules).map((moduleName) => {
        if (portal8.modules[moduleName].hidden) {
          return undefined;
        }
        return (
          <Drawer.Screen name={portal8.modules[moduleName].name} key={moduleName}>
            {(e) => {
              return (<ModuleNavigation module={portal8.modules[moduleName]}/>);
            }}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
}
