import { ProgramProperties } from "../types";

export const Portal8: ProgramProperties = {
  console: "",
  modules: {
    login: {
      name: "Login",
      navigation: "Stack",
      pages: {
        login: {
          name: "Usuário",
          components: {
            usuario: {
              isEditable: true,
              isRequired: true,
              type: 'input',
              value: ''
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
            },
          },
        },
      },
    },
  },
};
