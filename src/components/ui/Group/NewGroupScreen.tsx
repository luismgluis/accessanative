import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";

const styles = StyleSheet.create({ container: {} });

const TAG = "NEW GROUP SCREEN";
type NewGroupScreenProps = {};
const NewGroupScreen: React.FC<NewGroupScreenProps> = ({}) => {
  return (
    <Panel level="5">
      <Text>Hello from NewGroupScreen</Text>
    </Panel>
  );
};
export default NewGroupScreen;
