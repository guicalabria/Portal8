import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Modal,
} from "react-native";
import { styles, stylesModal } from "@/src/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";

export function Date8({ field, onValueChange, dateOrder }: any) {
  const [showPicker, setShowPicker] = useState(false);

  const [dateArray, setDateArray] = useState<Date[]>([]);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    console.log(dateArray);
  }, [dateArray]);

  useEffect(() => {
    if (!showPicker && dateArray.length) {
      if (dateArray.length === 1) {
        onValueChange(formatDate(dateArray[0]), dateOrder);
      } else if (dateArray.length === 2) {
        onValueChange(formatDate(dateArray[0]), "start");
        onValueChange(formatDate(dateArray[1]), "end");
      }
    }
  }, [showPicker]);

  function onChange(e: Date, type: string) {
    let dateArrayTemp = dateArray;

    if (e) {
      dateArrayTemp.push(e);
    }

    if (type === "END_DATE") {
      if (dateArrayTemp.length > 2) {
        dateArrayTemp.shift();
      }
      toggleDatePicker();
    }

    console.log("ln 54", dateArray);

    setDateArray(dateArrayTemp);
  }

  const formatDate = (rawDate: any) => {
    let year = rawDate.getFullYear();
    let month: any = rawDate.getMonth() + 1;
    let day: any = rawDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}${month}${year}`;
  };

  function valueDetect() {
    if (dateOrder) {
      return field.valueMasked[dateOrder];
    }
    if (field.valueMasked) {
      return field.valueMasked;
    }
    return field.value;
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={field.placeholder}
          inputMode={field.inputMode}
          style={{ ...styles.input, ...field.customInputCSS }}
          maxLength={field.maxLength}
          value={valueDetect()}
          onChangeText={async (e) => {
            dateOrder ? onValueChange(e, dateOrder): onValueChange(e);
          }}
          keyboardType="numeric"
        />

        <Pressable
          style={{
            height: 30,
            width: 30,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setDateArray([]);
            toggleDatePicker();
          }}
        >
          <Ionicons name="calendar" size={18} color="white" />
        </Pressable>
      </View>

      {showPicker && (
        <Modal
          animationType="none"
          transparent={true}
          visible={showPicker}
          onRequestClose={() => {
            alert("Modal has been closed.");
            toggleDatePicker();
          }}
        >
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              <CalendarPicker
                allowRangeSelection={true}
                weekdays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
                months={[
                  "Janeiro",
                  "Fevereiro",
                  "Março",
                  "Abril",
                  "Maio",
                  "Junho",
                  "Julho",
                  "Agosto",
                  "Setembro",
                  "Outubro",
                  "Novembro",
                  "Dezembro",
                ]}
                previousTitle="Anterior"
                nextTitle="Próximo"
                textStyle={{
                  color: "#000000",
                }}
                onDateChange={onChange}
                allowBackwardRangeSelect={true}
              />
              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                }}
                onPress={toggleDatePicker}
              >
                {/* <Ionicons name="close" size={18} color="white" /> */}
                <Text style={{color: "white"}}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
