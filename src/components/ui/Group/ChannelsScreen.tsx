import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";

const styles = StyleSheet.create({ container: {} });

const TAG = "CHANNELS SCREEN";
type ChannelsScreenProps = {
  style?: StyleProp<ViewStyle>;
};
const ChannelsScreen: React.FC<ChannelsScreenProps> = ({ style }) => {
  return (
    <View style={style}>
      <Text>Hello from ChannelsScreen</Text>
    </View>
  );
};
export default ChannelsScreen;
