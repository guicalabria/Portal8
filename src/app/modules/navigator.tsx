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
  const classes = {};

  function onValueChange(
    e: any,
    component: string,
    page: string,
    moduleName: string
  ) {
    setPortal8((prevForm: ProgramProperties) => ({
      ...prevForm,
      modules: {
        ...prevForm.modules,
        [moduleName]: {
          ...prevForm.modules[moduleName],
          pages: {
            ...prevForm.modules[moduleName].pages,
            [page]: {
              ...prevForm.modules[moduleName].pages[page],
              components: {
                ...prevForm.modules[moduleName].pages[page].components,
                [component]: {
                  ...prevForm.modules[moduleName].pages[page].components[
                    component
                  ],
                  value: e,
                },
              },
            },
          },
        },
      },
    }));
    console.log(e, component, page, moduleName);
  }

  return (
    <Drawer.Navigator>
      {Object.keys(portal8.modules).map((moduleName) => {
        if (portal8.modules[moduleName].hidden) {
          return undefined;
        }
        return (
          <Drawer.Screen
            name={portal8.modules[moduleName].name}
            key={moduleName}
          >
            {(e) => {
              return (
                <ModuleNavigation
                  module={portal8.modules[moduleName]}
                  moduleName={moduleName}
                  classes={classes}
                  onValueChange={(
                    e: any,
                    component: string,
                    page: string,
                    moduleName: string
                  ) => onValueChange(e, component, page, moduleName)}
                />
              );
            }}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
}
