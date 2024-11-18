import { StyleSheet } from "react-native";

export const fontSizeDefault = 20;
export const widthDefault = 250;

export const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "black",
  },
  containerScrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    
  },
  inputLabel: {
    fontSize: fontSizeDefault,
    color: "#ffffff",
  },
  input: {
    fontSize: fontSizeDefault,
    height: 30,
    backgroundColor: "#ffffff",
    color: "#000000",
    width: widthDefault,
  },
  inputBox: {
    fontSize: fontSizeDefault,
    height: 60,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: widthDefault,
  },
  button: {
    width: widthDefault,
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },
  dropdown: {
    fontSize: fontSizeDefault,
  },
  dropdownMulti: {
    fontSize: fontSizeDefault / 2,
    flexDirection: "column",
  },
  buttonFile: {
    backgroundColor: "#d80000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextFile: {
    color: "#ffffff",
    fontSize: fontSizeDefault,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontSize: 15,
  },
});

export const stylesModal = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export const stylesTable = StyleSheet.create({
  header: { height: 50, backgroundColor: "#3279ca" },
  headerText: { textAlign: "center", fontWeight: "400", color: "white" },
  text: { textAlign: "center", fontWeight: "200" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#c5c5c5" },
  rowOdd: { height: 40, backgroundColor: "#f5f5f5" },
});
