import { ProgramProperties } from "../types";

export const Portal8: ProgramProperties = {
  console: "",
  modules: {
    login: {
      name: "Login",
      navigation: "Stack",
      pages: {
        loginUser: {
          name: "Usuário",
          components: {
            checkbox: {
              isEditable: true,
              isRequired: false,
              type: 'checkBox',
              value: false,
            },
            usuario: {
              isEditable: true,
              isRequired: true,
              type: 'input',
              value: '',
              textStyle: {width: 200, height: 30, backgroundColor: "#ffffff"},
            },
            date: {
              type: 'date',
              value: '',
              isEditable: true,
              isRequired: true,
              textStyle: {width: 200, height: 30, backgroundColor: "#ffffff"},
            }
          }
        }
      },
    },
    cliente: {
      name: "Cliente",
      navigation: "Drawer",
      pages: {
        cadastro: {
          name: "Cadastro de Cliente",
          components: {
            nome: {
              isEditable: true,
              isRequired: true,
              type: "input",
              value: "",
              label: "Nome",
              textStyle: {width: 200, height: 30, backgroundColor: "#ffffff"},
            },
          },
        },
      },
    },
  },
};
