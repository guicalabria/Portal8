import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Style, TableCss, TableProperties } from "../types";

export interface Component {
  label?: string;
  type:
    | "input"
    | "select"
    | "multiSelect"
    | "boolean"
    | "date"
    | "file"
    | "grid"
    | "table"
    | "button"
    | "textBox"
    | "image"
    | "text"
    | "video"
    | "sound"
    | "googleMap";
  value: string;
  inputMode?: 
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  placeholder?: string;
  masks?: string[] | [RegExp, string, number][];
  valueMasked?: string;
  maxLength?: number;
  optionsItems?: { label: string; value: string }[];
  isCurrency?: boolean;
  classCss?: string;
  sourceURL?: string;
  token?: string;
  textStyle?: TextStyle;
  imageStyle?: ImageStyle;
  viewStyle?: ViewStyle;
}

export interface PageComponent extends Component {
  isRequired: boolean;
  isEditable: boolean;
  function?: any;
  onPress?: string;
  onLongPress?: string;
  tableProperties?: TableProperties;
  errorMsg?: string;
  groupTab?: string;
}

export interface TableComponent extends Component {
  isNumber?: boolean;
  columnStyle?: TableCss;
  width: number;
  isVisible: boolean;
  searchParam?: string[] | [RegExp, string][];
  footerLabel?: { function: "sumEntries" | "sumTotal"; value: string };
  cellMasks?: string[] | [RegExp, string, number][];
  callbackMask?: [RegExp, string];
  searchSign?: "equals" | "greater-than" | "less-than";
}
