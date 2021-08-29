import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";
import { useRef } from "react";

const styles = StyleSheet.create({
  container: {},

  panelBottom: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  textPoints: {
    fontSize: 20,
    color: "gray",
  },
});

interface QrCodeScannerCustom extends QRCodeScanner {
  flashMode: string;
}

const TAG = "QR SCANNER";
type QRScannerProps = {
  style?: StyleProp<ViewStyle>;
  onRead: (qrScanned: string) => void;
};
const QRScanner: React.FC<QRScannerProps> = ({
  style,
  onRead = (text: string) => null,
}) => {
  const [torchEnabled, setTorchEnabled] = useState(false);

  const flashMode = torchEnabled
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  const parms: any = {
    flashMode: flashMode,
    topContent: <Text>Qr Code Scanner</Text>,
  };
  const [textScanned, setTextScanned] = useState("");
  const [pointsText, setPointsText] = useState("");

  useEffect(() => {
    //console.log(TAG, "point", pointsAwait);
    if (textScanned !== "") {
      let totalPoints = "";
      for (let index = 1; index < 7; index++) {
        const myPoints = totalPoints + ".";
        totalPoints = myPoints;
        utils.timeOut(500 * index).then(() => {
          if (index === 6) {
            setPointsText("");
            return;
          }
          setPointsText(myPoints);
        });
      }
    }
  }, [textScanned]);

  const lastScanned = useRef({ text: "" }).current;

  const customRead = useCallback(
    (text: string = "") => {
      if (text !== "" && text !== lastScanned.text) {
        onRead(text);
        setTimeout(() => {
          lastScanned.text = "";
        }, 500);
      }
    },
    [lastScanned, onRead],
  );
  return (
    <Panel flex={1} style={style}>
      <QRCodeScanner
        checkAndroid6Permissions={true}
        onRead={(e) => {
          console.log(TAG, "qrScanned", e);
          setTextScanned(e.data);
          customRead(e.data);
        }}
        reactivate={true}
        reactivateTimeout={2000}
        fadeIn={true}
        {...parms}
      />
      <View style={styles.panelBottom}>
        <Text category="h1">{pointsText}</Text>
      </View>
    </Panel>
  );
};
export default QRScanner;
