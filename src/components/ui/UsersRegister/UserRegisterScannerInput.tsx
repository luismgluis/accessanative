import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import CInput from "../CInput/CInput";
import { useRef } from "react";
import { useAbc } from "../../hooks/useAbc";
import ScannerIcon from "../../Icons/UsersAccess/ScannerIcon";
import { useTheme } from "../../hooks/useTheme";
import documentAnalicer from "../../../libs/utils/documentAnalicer";

const styles = StyleSheet.create({ container: {} });

const TAG = "USER REGISTER SCANNER INPUT";

type DocumentDataResult = {
  name: string;
  number: string;
};
type UserRegisterScannerInputProps = {
  onResult?: (data: DocumentDataResult) => void;
};
const UserRegisterScannerInput: React.FC<UserRegisterScannerInputProps> = ({
  onResult = () => null,
}) => {
  const dicc = useAbc().abc.registerUser;
  const [inputValue, setInputValue] = useState("");
  const currentValueScanned = useRef("");
  const theme = useTheme();
  const timer: any = useRef(null);

  const onChange = (valueChange: string) => {
    setInputValue(valueChange);
    currentValueScanned.current = valueChange;
    const oldValue = valueChange;
    return;
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (oldValue === currentValueScanned.current) {
        console.log("finish", oldValue, currentValueScanned.current);
        const docAnalicer = new documentAnalicer();
        const analicer = docAnalicer.analicer();
        const result: DocumentDataResult = {
          name: analicer.getDocumentName(oldValue),
          number: analicer.getDocumentNumber(oldValue),
        };
        console.log(TAG, result);
        // onResult(result);
      }
    }, 500);
  };

  return (
    <CInput
      paddingVertical={20}
      value={inputValue}
      onChangeText={(t) => onChange(t)}
      label={dicc.scanner}
      placeholder="**** Scanner Cedula ****"
      accessoryLeft={(props) => (
        <ScannerIcon
          color={theme.colors["color-primary-700"]}
          width={30}
          height={30}
        />
      )}
    />
  );
};
export default UserRegisterScannerInput;
