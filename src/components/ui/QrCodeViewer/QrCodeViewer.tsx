import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import CTopBack from "../CTopBack/CTopBack";
import { useTheme } from "../../hooks/useTheme";
import QRCode from "react-native-qrcode-svg";
import CText from "../CText/CText";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
});

const TAG = "IMAGE VIEWER";
type QrCodeViewerProps = {
  navigation: any;
  route: any;
};
const QrCodeViewer: React.FC<QrCodeViewerProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const data = {
    value: "",
    title: "QR CODE FROM ACCESSA",
  };
  if (typeof route.params !== "undefined") {
    if (typeof route.params.value !== "undefined") {
      data.value = route.params.value;
    }
    if (typeof route.params.title !== "undefined") {
      data.title = route.params.title;
    }
  }

  return (
    <Panel totalHeight={0}>
      <CTopBack title="" onBackPress={() => navigation.goBack()} />
      <Panel verticalCenter={true} style={styles.container}>
        <QRCode
          value={data.value}
          size={150}
          backgroundColor={theme.colors["color-bg-500"]}
          color={theme.colors["color-primary-800"]}
        />
        <Panel paddingVertical={20}>
          <CText category="h5">{data.title}</CText>
        </Panel>
      </Panel>
    </Panel>
  );
};
export default QrCodeViewer;
