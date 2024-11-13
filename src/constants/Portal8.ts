import { ProgramProperties } from "../types";

export const Portal8: ProgramProperties = {
  console: "",
  modules: {
    login: {
      name: "Login",
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
      hidden: true,
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
