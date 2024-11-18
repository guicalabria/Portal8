import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ModuleProperties, PageProperties } from "@/src/types";
import PageModule from "./pageModule";

const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function ModuleNavigation({
  module,
  moduleName,
}: {
  module: ModuleProperties;
  moduleName: string;
}) {
  const navigators: { [key: string]: any } = {
    Drawer: (pages: { [key: string]: PageProperties }) => (
      <Drawer.Navigator screenOptions={{ drawerPosition: "right" }}>
        {Object.keys(pages).map((pageName) => {
          if (pages[pageName].hidden) return undefined;
          return (
            <Drawer.Screen name={pages[pageName].name} key={pageName}>
              {(e) => <PageModule {...e} page={pages[pageName]} />}
            </Drawer.Screen>
          );
        })}
      </Drawer.Navigator>
    ),
    Stack: (pages: { [key: string]: PageProperties }) => (
      <Stack.Navigator>
        {Object.keys(pages).map((pageName) => {
          if (pages[pageName].hidden) return undefined;
          return (
            <Stack.Screen name={pages[pageName].name} key={pageName}>
              {(e) => <PageModule {...e} page={pages[pageName]} />}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    ),
    Tabs: (pages: { [key: string]: PageProperties }) => (
      <Tabs.Navigator>
        {Object.keys(pages).map((pageName) => {
          if (pages[pageName].hidden) return undefined;
          return (
            <Tabs.Screen name={pages[pageName].name} key={pageName}>
              {(e) => <PageModule {...e} page={pages[pageName]} />}
            </Tabs.Screen>
          );
        })}
      </Tabs.Navigator>
    ),
  };
  return navigators[module.navigation](module.pages);
}
