import { StyleSheet, View } from "react-native";
import React from "react";
import { Spinner, Text } from "@ui-kitten/components";
import Panel from "../Panel/Panel";

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "red",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
  },
  panel1: {
    flex: 1,
    maxHeight: 100,
    flexDirection: "column-reverse",
  },
  panel2: {
    alignItems: "center",
    margin: 20,
  },
  text: { textAlign: "center", width: "100%" },
});

const TAG = "LOADING PANEL";
type LoadingPanelProps = {
  text?: string;
};
const LoadingPanel: React.FC<LoadingPanelProps> = ({ text = "" }) => {
  return (
    <Panel level="0" paddingVertical={20}>
      <Text style={styles.text} category="h5">
        {text}
      </Text>
      <View style={styles.panel2}>
        <Spinner size="giant" />
      </View>
    </Panel>
  );
};
export default LoadingPanel;
