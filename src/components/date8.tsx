import { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, Modal } from "react-native";
import { styles, stylesModal } from "@/src/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { PageComponent } from "../interfaces";

export function Date8({
  component,
  onValueChange,
}: {
  component: PageComponent;
  onValueChange: any;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    console.log(component.value);
  }, [component.value]);

  function onChange(e: Date, type: string) {
    onValueChange(e, type)
  }

  const formatDate = (rawDate: any) => {
    let year = rawDate.getFullYear();
    let month: any = rawDate.getMonth() + 1;
    let day: any = rawDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}${month}${year}`;
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={component.placeholder}
          style={{ ...styles.input, ...component.textStyle }}
          maxLength={component.maxLength}
          value={component.valueMasked}
          onChangeText={(e) => onValueChange(e)}
        />

        <Pressable
          style={{
            height: 30,
            width: 30,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => toggleDatePicker()}
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
                <Text style={{ color: "white" }}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
