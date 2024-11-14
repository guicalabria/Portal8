import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { PageComponent, TableComponent } from "../interfaces";

// type x = "idade" | "altura"
// type pessoa = {[key in x]?: number}
// const itinho: pessoa = {altura:1}

export type Style = ViewStyle | TextStyle | ImageStyle;

export type DataRow = {
  [key: string]: string;
};

export type DataTable = {
  formAtual: DataRow[];
  [key: string]: any;
};

export type SortedCol = {
  name: string;
  order: "asc" | "desc";
};

export type TableCss = {
  header?: ViewStyle;
  cell?: ViewStyle;
  footer?: ViewStyle;
  column?: ViewStyle;
  headerText?: TextStyle;
  cellText?: TextStyle;
  footerText?: TextStyle;
  columnText?: TextStyle;
};

export interface Location {
  module: string;
  page: string;
  component: string;
}

export type ProgramProperties = {
  temp?: boolean;
  style?: { [key: string]: Style };
  console: string;
  classCssString?: string[];
  classCss?: { [key: string]: Style };
  functions?: { [key: string]: any };
  modules: { [key: string]: ModuleProperties };
  initialModule?: { [key: string]: string }; // "Nome do Módulo": "Página"
};

export type ModuleProperties = {
  name: string;
  navigation: "Drawer" | "Stack" | "Tab";
  hidden?: boolean;
  stringFunctions?: string[];
  style?: Style;
  variables?: any;
  functions?: any;
  pages: {
    [key: string]: PageProperties;
  };
};

export type PageProperties = {
      name: string;
      hidden?: boolean;
      style?: Style;
      components: { [key: string]: PageComponent };
}

export type TableProperties = {
  dataView?: DataRow[];
  dataOrigin?: DataRow[];
  settings: {
    title?: string;
    style?: TableCss;
    sort?: SortedCol;
    URL?: string;
    hasSearchBar: boolean;
  };
  columns?: {
    [key: string]: TableComponent;
  };
}
