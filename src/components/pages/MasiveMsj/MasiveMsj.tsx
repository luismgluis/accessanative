import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";

import { useTheme } from "../../hooks/useTheme";
import QRCode from "react-native-qrcode-svg";
import CText from "../../ui/CText/CText";
import CTopBack from "../../ui/CTopBack/CTopBack";
import Panel from "../../ui/Panel/Panel";
import { Input } from "@ui-kitten/components";
import CInput from "../../ui/CInput/CInput";
import CButton from "../../ui/CButton/CButton";
import api from "../../../libs/api/api";
import { ResidentType } from "../../../libs/types/ResidentType";
import { CAlertInfo } from "../../ui/CAlert/CAlertNotification";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
});

const TAG = "IMAGE VIEWER";
type MasiveMsjProps = {
  navigation: any;
  route: any;
};
const MasiveMsj: React.FC<MasiveMsjProps> = ({ navigation, route }) => {
  const theme = useTheme();

  const data = {
    resident: new ResidentType("", null),
    masive: false,
    title: "QR CODE FROM ACCESSA",
  };
  const [inputValue, setInputValue] = useState("");
  if (typeof route.params !== "undefined") {
    if (typeof route.params.resident !== "undefined") {
      data.resident = route.params.resident;
    }
    if (typeof route.params.masive !== "undefined") {
      data.masive = route.params.masive;
    }
    if (typeof route.params.title !== "undefined") {
      data.title = route.params.title;
    }
  }
  const send = useCallback(() => {
    if (!(inputValue.length > 5)) {
      CAlertInfo("Mensaje muy corto", "");
      return;
    }
    if (data.masive) {
      api.residents
        .getAllResidents()
        .then((res) => {
          res.forEach((resi) => {
            api.residents.sendTelegramMessage(resi, inputValue, [], false);
          });
          CAlertInfo("Listo", "Mensajes enviados a distribucion del bot.");
          setInputValue("");
        })
        .catch(() => {
          CAlertInfo(
            "Fallo",
            "No se consiguio realizar la difusión con exito.",
          );
        });
    }
    if (!data.resident.isEmpty()) {
      api.residents.sendTelegramMessage(data.resident, inputValue, [], false);
      CAlertInfo("Listo", "Mensaje enviado a distribucion del bot.");
      setInputValue("");
    }
  }, [inputValue]);
  return (
    <Panel totalHeight={0}>
      <CTopBack title="" onBackPress={() => navigation.goBack()} />
      <Panel
        style={styles.container}
        paddingVertical={20}
        paddingHorizontal={20}>
        <Panel paddingVertical={20}>
          <CText category="h5">{data.title}</CText>
        </Panel>
        <CInput
          placeholder="Escribe un mensaje... "
          numberOfLines={4}
          multiline
          value={inputValue}
          onChangeText={(t) => setInputValue(t)}
        />
        <CButton paddingVertical={20} text="Enviar" onPress={send} />
        <CText category="label">
          El mensaje sera enviado mediante el bot de telegram.
        </CText>
      </Panel>
    </Panel>
  );
};
export default MasiveMsj;
