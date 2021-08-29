import { StyleSheet, View } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Spinner, Text } from "@ui-kitten/components";
const styles = StyleSheet.create({
  spinner: {
    marginTop: 30,
    marginBottom: 30,
  },
});

const TAG = "LOADING SCREEN";
type LoadingScreenProps = {
  title: string;
  subTitle?: string;
};
const LoadingScreen: React.FC<LoadingScreenProps> = ({ title, subTitle }) => {
  return (
    <Panel verticalCenter={true} horizontalCenter={true} totalHeight={0}>
      <Text category="h3">{title}</Text>
      <View style={styles.spinner}>
        <Spinner size="giant" />
      </View>
      <Text category="s1">{subTitle!}</Text>
    </Panel>
  );
};
export default LoadingScreen;
