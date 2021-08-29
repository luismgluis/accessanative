import { StyleSheet, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import Panel from "../../Panel/Panel";
import { ResidentType } from "../../../../libs/types/ResidentType";
import { UserAccessModule } from "../UserAccessModule";
import QRScanner from "../../QRScanner/QRScanner";
import CButton from "../../CButton/CButton";
import ScannerIcon from "../../../Icons/UsersAccess/ScannerIcon";
import { useTheme } from "../../../hooks/useTheme";
import CInput from "../../CInput/CInput";
import { useCallback } from "react";
import { CAlertInfo } from "../../CAlert/CAlertNotification";
import CloseIcon from "../../../Icons/others/CloseIcon";

const styles = StyleSheet.create({ container: {} });

const TAG = "USER ACCESS QR";
type UserAccessQrProps = {
  onResult?: (data: ResidentType | null) => void;
  cancelButton?: boolean;
};
const UserAccessQr: React.FC<UserAccessQrProps> = ({
  onResult = () => null,
  cancelButton,
}) => {
  const theme = useTheme();
  const module = useRef(new UserAccessModule()).current;
  const refInput: any = useRef();
  const timer: any = useRef(null);
  const currentValueScanned = useRef("");
  const [manualScannerEnabled, setScannerEnabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const onQRRead = useCallback((data: any) => {
    module.onQRRead(data, (res) => {
      if (!res.isEmpty()) {
        onResult(res);
        setInputText("");
        refInput.current?.focus();
        return;
      }
      CAlertInfo("Sin resultados", "", () => {
        setInputText("");
        refInput.current?.focus();
      });
    });
  }, []);

  const onInputChange = (valueChange: string) => {
    console.log(TAG, valueChange);
    setInputText(valueChange);
    currentValueScanned.current = valueChange;
    const oldValue = valueChange;
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (oldValue === currentValueScanned.current) {
        console.log("finish", oldValue, currentValueScanned.current);
        onQRRead(oldValue);
      }
    }, 500);
  };

  return (
    <Panel level={manualScannerEnabled ? "9" : "5"} totalHeight={"40%"}>
      {!manualScannerEnabled && <QRScanner onRead={(text) => onQRRead(text)} />}
      {manualScannerEnabled && (
        <Panel paddingVertical={60}>
          <TextInput
            style={{
              fontSize: 18,
              color: theme.colors["color-primary-700"],
              height: 50,
              backgroundColor: theme.colors["color-basic-500"],
            }}
            ref={refInput}
            placeholder="Texto scaneado"
            value={inputText}
            onChangeText={onInputChange}
          />
        </Panel>
      )}
      <Panel style={{ position: "absolute", top: 10, left: 10 }}>
        <CButton
          paddingHorizontal={5}
          onPress={() => setScannerEnabled(!manualScannerEnabled)}
          imageInsertComponent={() => (
            <ScannerIcon
              color={
                !manualScannerEnabled
                  ? theme.colors["color-basic-600"]
                  : theme.colors["color-primary-500"]
              }
              width={55}
              height={50}
            />
          )}></CButton>
      </Panel>

      {!manualScannerEnabled && cancelButton && (
        <Panel style={{ position: "absolute", bottom: 70, right: 10 }}>
          <CButton
            paddingHorizontal={5}
            onPress={() => onResult(null)}
            text="Cancelar busqueda"></CButton>
        </Panel>
      )}
    </Panel>
  );
};
export default UserAccessQr;
