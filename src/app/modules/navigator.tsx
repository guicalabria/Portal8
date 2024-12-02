// Aqui contém a navegação do programa carregado, cada modulo carrega um conjunto de páginas
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

  function maskedValue(value: string, mask: any) {
    value = value.replace(/\D/g, "") || "";
    for (let i = 0; i < mask.length; i++) {
      if (value.length >= mask[i][2]) {
        value = value.replace(mask[i][0], mask[i][1]);
        break;
      }
    }
    while (/[^\w\s]$/.test(value)) {
      value = value.slice(0, -1);
    }
    return value;
  }

  function onValueChange(
    e: any,
    component: string,
    page: string,
    moduleName: string
  ) {
    if (portal8.modules[moduleName].pages[page].components[component].masks) {
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
                    valueMasked: maskedValue(
                      e,
                      portal8.modules[moduleName].pages[page].components[
                        component
                      ].masks
                    ),
                  },
                },
              },
            },
          },
        },
      }));
    }
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
  }

  return (
    <Drawer.Navigator>
      {Object.keys(portal8.modules).map((moduleName) => {
        if (portal8.modules[moduleName].hidden) {
          return;
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
