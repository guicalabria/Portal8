// Componente de tabela para exibição de dados em JSON
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from "@/src/components/SyncedScrollViewContext";
import { SyncedScrollView } from "./SyncedScrollView";
import { isWithinInterval, parseISO } from "date-fns";
import { DataRow, DataTable, SortedCol } from "@/src/types";

export function Table8({
  // navigation,
  // route,
  moduleParam,
  urlParam,
  onValueChange,
}: any) {
  const [params, setParams] = useState(moduleParam.tableParam);
  const [searchWord, setSearchWord] = useState("");
  const [lockedColTable, setLockedColTable] = useState<Set<string>>(new Set());
  const [colTable, setColTable] = useState<Set<string>>(new Set());
  const [colTableOrigin, setColTableOrigin] = useState<Set<string>>();
  const [colVisibility, setColVisibility] = useState<string[]>([]);
  const [routeParams, setRouteParams] = useState({});
  const [footer, setFooter] = useState<Boolean>(false);
  const [sortedCol, setSortedCol] = useState<SortedCol>({
    name: params.tableSort ? params.tableSort : undefined,
    order: "asc",
  });

  // useEffect(() => {
  //   if (route.params?.formData) {
  //     setRouteParams(route.params.formData);
  //   }
  //   if (route.params?.colVisibility) {
  //     setColVisibility(route.params.colVisibility);
  //   }
  // }, [route.params]);

  // useEffect(() => {
  //   urlParam &&
  //     loadData().then((dataOnline: DataTable) => {
  //       dataOnline.forEach((dataRow: DataRow) => {
  //         Object.keys(dataRow).forEach((key: string) => {
  //           if (dataOnline[key]) {
  //             dataRow[key] = dataOnline[key][dataRow[key]];
  //           } else if (dataRow[key] === "&nbsp;") {
  //             dataRow[key] = "";
  //           }
  //         });
  //       });

  //       onValueChange(dataOnline, "Table");
  //       // onValueChange(dataOnline, "Origin");
  //     });

  //   const dataSet: Set<string> = new Set(
  //     Object.keys(params).map((colKey) => colKey)
  //   );
  //   setColTableOrigin(dataSet);

  //   const colVisArray: string[] = [];

  //   Object.keys(params).forEach((colKey) => {
  //     !params[colKey].isVisible && colVisArray.push(colKey);
  //   });
  //   console.log("Data loaded!");

  //   setColVisibility(colVisArray);
  // }, []);



  // useEffect(() => {
  //   const colData: string[] = [];
  //   const colVisibilityTemp = new Set(colVisibility);
  //   const lockedColTableTemp = lockedColTable;

  //   Object.keys(params).forEach((colKey) => {
  //     if (colVisibilityTemp.has(colKey)) {
  //       lockedColTableTemp.delete(colKey);
  //     } else {
  //       if (!lockedColTableTemp.has(colKey)) {
  //         colData.push(colKey);
  //       }
  //     }
  //   });

  //   setColTable(new Set(colData));
  //   setLockedColTable(lockedColTableTemp);
  // }, [colVisibility]);

  // useEffect(() => {
  //   handleFilterSearch(routeParams);
  // }, [routeParams]);

  // useEffect(() => {
  //   Object.keys(params).forEach((key) => {
  //     if (!footer && params[key].footerLabel) {
  //       setFooter(true);
  //     }
  //     switch (params[key].footerLabel?.function) {
  //       case "sumTotal":
  //         let sumTotal = 0;

  //         moduleParam.dataTable.forEach((row: any) => {
  //           sumTotal += Number(row[key]);
  //         });
  //         setParams((prevParam: any) => ({
  //           ...prevParam,
  //           [key]: {
  //             ...prevParam[key],
  //             footerLabel: {
  //               function: "sumTotal",
  //               value: String(sumTotal.toFixed(2)),
  //             },
  //           },
  //         }));
  //         break;
  //       case "sumEntries":
  //         setParams((prevParam: any) => ({
  //           ...prevParam,
  //           [key]: {
  //             ...prevParam[key],
  //             footerLabel: {
  //               function: "sumEntries",
  //               value: String(moduleParam.dataTable.length),
  //             },
  //           },
  //         }));
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }, [moduleParam.dataTable]);

  // useEffect(() => {
  //   sortTable(sortedCol);
  // }, [sortedCol]);

  function loadData() {
    let link = urlParam;
    console.log(link);
    return fetch(link, { cache: 'no-store' })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  function handleLockedTable(colKey: string) {
    let lockedColTableTemp = new Set(lockedColTable);
    let colTableOriginTemp = new Set(colTableOrigin);

    if (lockedColTableTemp.has(colKey)) {
      lockedColTableTemp.delete(colKey);
    } else {
      lockedColTableTemp.add(colKey);
    }

    colVisibility.forEach((key) => colTableOriginTemp.delete(key));
    lockedColTableTemp.forEach((key) => colTableOriginTemp.delete(key));

    setColTable(colTableOriginTemp);
    setLockedColTable(lockedColTableTemp);
  }

  function handleSizeLockedTable() {
    if (Array.from(lockedColTable).length <= 0) {
      return 0;
    }

    if (params[Array.from(lockedColTable)[0]].tableWidth < 200) {
      return params[Array.from(lockedColTable)[0]].tableWidth;
    }
  }

  function handleBar() {
    if (Array.from(lockedColTable).length <= 0) {
      return "none";
    } else {
      return;
    }
  }

  function handleSizeTable() {
    if (Array.from(colTable).length <= 0) {
      return 0;
    }
    if (
      Array.from(colTable).length === 1 &&
      params[Array.from(colTable)[0]].tableWidth < 200
    ) {
      return params[Array.from(colTable)[0]].tableWidth;
    }
  }

  function accentRemove(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function cellValueMask(value: string, colKey: string) {
    if (params[colKey]) {
      const mask = params[colKey].cellMasks
        ? params[colKey].cellMasks
        : params[colKey].masks
          ? params[colKey].masks
          : false;

      if (mask && value !== undefined) {
        const cleanValue = value.replace(/\D/g, "");
        for (let i = 0; i < mask.length; i++) {
          if (cleanValue.length >= Number(mask[i][2])) {
            return cleanValue.replace(mask[i][0], mask[i][1]);
          }
        }
      }
    }
    return value;
  }

  function formatCurrency(value: string): string {
    // Remove todos os caracteres que não forem números, ponto ou vírgula
    value = value.replace(/[^\d.,]/g, "");

    // Verifica se o valor possui mais de um ponto ou mais de uma vírgula
    const countDot = (value.match(/\./g) || []).length;
    const countComma = (value.match(/,/g) || []).length;

    if (countDot > 1 || countComma > 1) {
      // Remove todos os pontos e vírgulas, retornando apenas os números
      return value.replace(/[.,]/g, "");
    }

    // Separa o valor em duas partes: antes e depois do último ponto ou vírgula
    const lastSeparator = Math.max(
      value.lastIndexOf("."),
      value.lastIndexOf(",")
    );

    if (lastSeparator !== -1) {
      const integerPart = value
        .substring(0, lastSeparator)
        .replace(/[^0-9]/g, "");
      const decimalPart = value
        .substring(lastSeparator + 1)
        .replace(/[^0-9]/g, "");
      return `${integerPart}.${decimalPart}`;
    }

    // Se não houver ponto ou vírgula, retornar o valor sem modificações
    return value.replace(/[^0-9]/g, "");
  }

  function handleGlobalSearch() {
    if (searchWord === "") {
      onValueChange(moduleParam.dataOrigin, "Table");
      return;
    }

    let cleanSearchWord = searchWord.replace(/\D/g, "");

    const filteredData: DataRow[] = [];

    moduleParam.dataOrigin.forEach((row: any) => {
      const filteredRow: string[] = [];

      (Object.keys(row) as Array<keyof DataRow>).forEach((colKey: any) => {
        if (params[colKey]) {
          const cellValue = row[colKey] as string;
          let cleanCellValue = cellValue.replace(/\D/g, "");

          if (cellValue !== "" && cellValue !== null) {
            if (params[colKey]?.isNumber && cleanSearchWord !== "") {
              if (searchWord[0] === "<" || searchWord[0] === ">") {
                let cleanSearchParam = searchWord.split("");
                cleanSearchParam.shift();

                if (
                  searchWord[0] === "<" &&
                  Number(row[colKey]) <= Number(cleanSearchParam.join(""))
                ) {
                  filteredRow.push(row[colKey]);
                }

                if (
                  searchWord[0] === ">" &&
                  Number(row[colKey]) >= Number(cleanSearchParam.join(""))
                ) {
                  filteredRow.push(row[colKey]);
                }
              } else if (params[colKey].searchParam) {
                // CPF, CNPJ, DATA
                params[colKey].searchParam.forEach((mask: any) => {
                  if (
                    cleanCellValue
                      .replace(mask[0], mask[1])
                      .includes(cleanSearchWord)
                  ) {
                    filteredRow.push(cellValue);
                  }
                });
              } else if (params[colKey].isCurrency) {
                // Dinheiro
                let currencySeachWord = formatCurrency(searchWord);
                if (cellValue.includes(currencySeachWord)) {
                  filteredRow.push(cellValue);
                }
              } else if (cellValue.includes(cleanSearchWord)) {
                filteredRow.push(cellValue);
              }
            } else if (
              accentRemove(cellValue).includes(accentRemove(searchWord))
            ) {
              filteredRow.push(cellValue);
            }
          }
        }
      });

      filteredRow.length > 0 && filteredData.push(row);
    });

    onValueChange(filteredData, "Table");
  }

  function handleFilterSearch(filters?: any) {
    if (filters && Object.keys(filters).length > 0) {
      let filteredDataForm = filters;
      const filteredData: DataRow[] = [];

      moduleParam.dataOrigin.forEach((row: any) => {
        const filteredRow: string[] = [];
        Object.keys(filteredDataForm).forEach((colKey) => {
          if (filteredDataForm[colKey] !== null) {
            if (typeof filteredDataForm[colKey] === "string") {
              if (
                filteredDataForm[colKey][0] === "<" ||
                filteredDataForm[colKey][0] === ">"
              ) {
                let cleanSearchParam = filteredDataForm[colKey].split("");
                cleanSearchParam.shift();

                if (
                  filteredDataForm[colKey][0] === "<" &&
                  Number(row[colKey]) <= Number(cleanSearchParam.join(""))
                ) {
                  filteredRow.push(row[colKey]);
                }

                if (
                  filteredDataForm[colKey][0] === ">" &&
                  Number(row[colKey]) >= Number(cleanSearchParam.join(""))
                ) {
                  filteredRow.push(row[colKey]);
                }
              } else if (
                accentRemove(row[colKey]).includes(
                  accentRemove(filteredDataForm[colKey])
                )
              ) {
                filteredRow.push(row[colKey]);
              }
            } else if (typeof filteredDataForm[colKey] === "object") {
              const date = parseISO(row[colKey]);
              const interval = {
                start: parseISO(
                  filteredDataForm[colKey].start !== ""
                    ? filteredDataForm[colKey].start
                    : "0001-01-01"
                ),
                end: parseISO(
                  filteredDataForm[colKey].end !== ""
                    ? filteredDataForm[colKey].end
                    : "9999-01-01"
                ),
              };

              if (isWithinInterval(date, interval)) {
                filteredRow.push(row[colKey]);
              }
            }
          }
        });
        if (filteredRow.length === Object.keys(filteredDataForm).length) {
          filteredData.push(row);
        }
      });
      onValueChange(filteredData, "Table");
    } else {
      onValueChange(moduleParam.dataOrigin, "Table");
    }
  }

  function handleResetTable() {
    setSearchWord("");
    setRouteParams({});
  }

  function sortTable(sortedColObject: SortedCol) {
    function sortOrder(a: DataRow, b: DataRow) {
      if (sortedColObject.order === "asc") {
        if (params[sortedColObject.name]?.isNumber) {
          if (
            Number(a[sortedColObject.name]) > Number(b[sortedColObject.name])
          ) {
            return 1;
          }
          if (
            Number(a[sortedColObject.name]) < Number(b[sortedColObject.name])
          ) {
            return -1;
          }
          return 0;
        } else if (a[sortedColObject.name] > b[sortedColObject.name]) {
          return 1;
        }
        if (a[sortedColObject.name] < b[sortedColObject.name]) {
          return -1;
        }
        return 0;
      } else if (sortedColObject.order === "desc") {
        if (params[sortedColObject.name]?.isNumber) {
          if (
            Number(a[sortedColObject.name]) < Number(b[sortedColObject.name])
          ) {
            return 1;
          }
          if (
            Number(a[sortedColObject.name]) > Number(b[sortedColObject.name])
          ) {
            return -1;
          }
          return 0;
        } else if (a[sortedColObject.name] < b[sortedColObject.name]) {
          return 1;
        }
        if (a[sortedColObject.name] > b[sortedColObject.name]) {
          return -1;
        }
        return 0;
      }
      return 0;
    }

    let dataOriginTemp = [...moduleParam.dataOrigin];
    dataOriginTemp.sort(sortOrder);

    if (moduleParam.dataTable !== moduleParam.dataOrigin) {
      let dataTemp = [...moduleParam.dataTable];
      dataTemp.sort(sortOrder);
      onValueChange(dataTemp, "Table");
    }

    onValueChange(dataOriginTemp, "Origin");
  }

  function handleSortChange(colKey: string) {
    if (sortedCol.name === colKey && sortedCol.order === "asc") {
      setSortedCol((prevSortedCol) => ({
        ...prevSortedCol,
        order: "desc",
      }));
    } else {
      setSortedCol((prevSortedCol) => ({
        ...prevSortedCol,
        name: colKey,
        order: "asc",
      }));
    }
  }

  return (
    <View style={{ borderWidth: 1, borderColor: "red" }}>
      <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
        <View
          style={{
            ...styles.container,
            borderWidth: 1,
            borderColor: "yellow",
            maxHeight: 300,
          }}
        >
          {moduleParam.tableSettings.hasSearchBar && (
            <View style={styles.serchBar}>
              <TextInput
                style={styles.input}
                placeholder="Pesquise..."
                value={searchWord}
                onChangeText={(e) => setSearchWord(e.trimStart())}
                onSubmitEditing={() => handleGlobalSearch()}
              />
              <Pressable
                style={styles.searchIcon}
                onPress={() => handleGlobalSearch()}
              >
                <FontAwesome name="search" size={24} color="white" />
              </Pressable>
              <Pressable
                style={styles.filterIcon}
                // onPress={() => navigation.navigate("FilterModal", route.params)}
              >
                <FontAwesome name="filter" size={24} color="white" />
              </Pressable>
              <Pressable
                style={{ ...styles.filterIcon, backgroundColor: "red" }}
                onPress={() => handleResetTable()}
              >
                <MaterialCommunityIcons name="broom" size={24} color="white" />
              </Pressable>
            </View>
          )}

          {moduleParam.tableSettings.title && (
            <Pressable
              onPress={() => {
                onValueChange(
                  [{ numero: "1", item: "Pão", quantidade: "10" }],
                  "Origin"
                );
              }}
            >
              <Text style={styles.text}>{moduleParam.tableSettings.title}</Text>
            </Pressable>
          )}

          <View style={styles.table}>
            <ScrollView
              horizontal={true}
              style={{ minWidth: handleSizeLockedTable() }}
              showsHorizontalScrollIndicator={false}
            >
              <Table>
                <TableWrapper style={styles.header}>
                  {Array.from(lockedColTable).map((colKey, colIndex) => (
                    <Pressable
                      key={colKey}
                      onPress={() => handleSortChange(colKey)}
                      onLongPress={() => handleLockedTable(colKey)}
                    >
                      <Cell
                        key={colIndex}
                        data={params[colKey].label}
                        style={{
                          ...styles.cellHead,
                          ...params[colKey].customColumnCSS,
                          ...params[colKey].customHeaderCSS,
                        }}
                        textStyle={{
                          ...styles.cellHeadText,
                          ...params[colKey].customColumnTextCSS,
                          ...params[colKey].customHeaderTextCSS,
                        }}
                        width={params[colKey].tableWidth}
                      />
                    </Pressable>
                  ))}
                </TableWrapper>

                <SyncedScrollView
                  scrollViewId={0}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                >
                  {moduleParam.dataTable.map((rowData: any, rowIndex: any) => {
                    return (
                      <TableWrapper key={rowIndex} style={styles.header}>
                        {(
                          Array.from(lockedColTable) as Array<keyof DataRow>
                        ).map((colKey, colIndex) => (
                          <Pressable
                            key={colIndex}
                            onLongPress={() => console.log(rowIndex)}
                          >
                            <Cell
                              key={colIndex}
                              data={cellValueMask(
                                rowData[colKey],
                                colKey as string
                              )}
                              style={{
                                ...styles.cellData,
                                ...params[colKey].customColumnCSS,
                                ...params[colKey].customCellCSS,
                              }}
                              textStyle={{
                                ...params[colKey].customColumnTextCSS,
                                ...params[colKey].customCellTextCSS,
                              }}
                              width={params[colKey].tableWidth}
                            />
                          </Pressable>
                        ))}
                      </TableWrapper>
                    );
                  })}
                </SyncedScrollView>

                {footer ? (
                  <TableWrapper style={styles.footer}>
                    {Array.from(lockedColTable).map((colKey, colIndex) => (
                      <Cell
                        key={colIndex}
                        data={
                          params[colKey].footerLabel
                            ? cellValueMask(
                                params[colKey].footerLabel.value,
                                colKey
                              )
                            : ""
                        }
                        style={{
                          ...styles.cellFoot,
                          ...params[colKey].customColumnCSS,
                          ...params[colKey].customFooterCSS,
                        }}
                        textStyle={{
                          ...styles.cellHeadText,
                          ...params[colKey].customColumnTextCSS,
                          ...params[colKey].customFooterTextCSS,
                        }}
                        width={params[colKey].tableWidth}
                      />
                    ))}
                  </TableWrapper>
                ) : (
                  <></>
                )}
              </Table>
            </ScrollView>
            <View
              style={{
                backgroundColor: "black",
                width: 3,
                display: handleBar(),
              }}
            ></View>
            {/*Divisória*/}
            <ScrollView
              horizontal={true}
              style={{ minWidth: handleSizeTable() }}
              showsHorizontalScrollIndicator={false}
            >
              <Table>
                <TableWrapper style={styles.header}>
                  {Array.from(colTable).map((colKey, colIndex) => (
                    <Pressable
                      key={colKey}
                      onPress={() => handleSortChange(colKey)}
                      onLongPress={() => handleLockedTable(colKey)}
                    >
                      <Cell
                        key={colIndex}
                        data={params[colKey].label}
                        style={{
                          ...styles.cellHead,
                          ...params[colKey].customColumnCSS,
                          ...params[colKey].customHeaderCSS,
                        }}
                        textStyle={{
                          ...styles.cellHeadText,
                          ...params[colKey].customColumnTextCSS,
                          ...params[colKey].customHeaderTextCSS,
                        }}
                        width={params[colKey].tableWidth}
                      />
                    </Pressable>
                  ))}
                </TableWrapper>

                <SyncedScrollView
                  scrollViewId={1}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                >
                  {moduleParam.dataTable.map((rowData: any, rowIndex: any) => {
                    return (
                      <TableWrapper key={rowIndex} style={styles.header}>
                        {(Array.from(colTable) as Array<keyof DataRow>).map(
                          (colKey, colIndex) => (
                            <Pressable
                              key={colIndex}
                              onLongPress={() =>
                                onValueChange(rowIndex, "Remove")
                              }
                            >
                              <Cell
                                key={colIndex}
                                data={cellValueMask(
                                  rowData[colKey],
                                  colKey as string
                                )}
                                style={{
                                  ...styles.cellData,
                                  ...params[colKey].customColumnCSS,
                                  ...params[colKey].customCellCSS,
                                }}
                                textStyle={{
                                  ...params[colKey].customColumnTextCSS,
                                  ...params[colKey].customCellTextCSS,
                                }}
                                width={params[colKey].tableWidth}
                              />
                            </Pressable>
                          )
                        )}
                      </TableWrapper>
                    );
                  })}
                </SyncedScrollView>
                {footer ? (
                  <TableWrapper style={styles.footer}>
                    {Array.from(colTable).map((colKey, colIndex) => (
                      <Cell
                        key={colIndex}
                        data={
                          params[colKey].footerLabel
                            ? cellValueMask(
                                params[colKey].footerLabel.value,
                                colKey
                              )
                            : ""
                        }
                        style={{
                          ...styles.cellFoot,
                          ...params[colKey].customColumnCSS,
                          ...params[colKey].customFooterCSS,
                        }}
                        textStyle={{
                          ...styles.cellHeadText,
                          ...params[colKey].customColumnTextCSS,
                          ...params[colKey].customFooterTextCSS,
                        }}
                        width={params[colKey].tableWidth}
                      />
                    ))}
                  </TableWrapper>
                ) : (
                  <></>
                )}
              </Table>
            </ScrollView>
          </View>
        </View>
      </SyncedScrollViewContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  serchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  searchIcon: {
    backgroundColor: "green",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    backgroundColor: "blue",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#000",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 40,
    padding: 8,
    backgroundColor: "#fff",
  },
  table: {
    flexDirection: "row",
    maxWidth: "95%",
    backgroundColor: "white",
  },
  cellHead: {
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    height: 60,
  },
  cellFoot: {
    backgroundColor: "#919ba9",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    height: 60,
  },
  cellHeadText: {
    color: "#fff",
  },
  cellData: {
    backgroundColor: "#eeeeee",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    height: 60,
  },
  header: {
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
  },
  tableLeft: {},
  tableRight: {},
});
