import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Panel from "../Panel/Panel";
import CTopBack from "../CTopBack/CTopBack";
import { useNavigation } from "@react-navigation/core";
import QRScanner from "./QRScanner";
import { Text } from "@ui-kitten/components";
import CButton from "../CButton/CButton";

const styles = StyleSheet.create({
  container: {},
  text: { textAlign: "center" },
});

const TAG = "QR SCANNER SCREEN";
type QRScannerScreenProps = {
  style?: StyleProp<ViewStyle>;
  route?: any;
  navigate?: any;
};
const QRScannerScreen: React.FC<QRScannerScreenProps> = ({ style, route }) => {
  const navigation = useNavigation();
  const callBack = useRef(
    (() => {
      const cleanFn = (data: any) => null;
      try {
        const fn = route.params.myCallBack;
        if (typeof fn === "function") {
          const newFun = (data: any) => {
            fn(data);
            navigation.goBack();
          };
          return newFun;
        }
        return cleanFn;
      } catch (error) {
        console.log(TAG, "fail in props to get callback");
        return cleanFn;
      }
    })(),
  );
  const [currentQrReaded, setCurrentQrReaded] = useState("");
  const onQrReader = (text: string) => {
    setCurrentQrReaded(text);
  };
  const sendResult = useCallback(() => {
    callBack.current(currentQrReaded);
    //navigation.goBack();
  }, [currentQrReaded, callBack]);
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack title="QR Scanner" onBackPress={() => navigation.goBack()} />
      <Panel totalHeight="50%" level="8">
        <QRScanner onRead={(text) => onQrReader(text)} torchEnabled={false} />
      </Panel>
      <Panel paddingVertical={10} totalHeight="50%" level="6">
        <Panel paddingVertical={20} horizontalCenter={true}>
          <Text category="h5" style={styles.text}>
            QR Scanned
          </Text>
        </Panel>
        <Panel level="5">
          <Text category="h1" style={styles.text}>
            {currentQrReaded !== "" ? currentQrReaded : "..."}
          </Text>
        </Panel>
        <Panel paddingVertical={20} horizontalCenter={true}>
          {currentQrReaded !== "" && (
            <CButton onPress={() => sendResult()} text="OK" />
          )}
        </Panel>
      </Panel>
    </Panel>
  );
};
export default QRScannerScreen;
