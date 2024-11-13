import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./home";
import { ProgramProperties } from "@/src/types";
import PageModule from "../components/pageModule";

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
          <Drawer.Screen name={portal8.modules[moduleName].name}>
            {(e) => (
              <Drawer.Navigator screenOptions={{ drawerPosition: "right" }}>
                {Object.keys(portal8.modules[moduleName].pages).map(
                  (pageName) => {
                    if (portal8.modules[moduleName].pages[pageName].hidden) {
                      return undefined;
                    }
                    return (
                      <Drawer.Screen name={portal8.modules[moduleName].name}>
                        {(e) => <PageModule />}
                      </Drawer.Screen>
                    );
                  }
                )}
              </Drawer.Navigator>
            )}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
}
