import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../../ui/Panel/Panel";
import CTopBack from "../../ui/CTopBack/CTopBack";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({ container: {} });

const TAG = "CHANNELS";
type ChannelsProps = {
  style?: StyleProp<ViewStyle>;
};
const Channels: React.FC<ChannelsProps> = ({ style }) => {
  const navigation = useNavigation();
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack title="Profile" onBackPress={() => navigation.goBack()} />
    </Panel>
  );
};
export default Channels;
