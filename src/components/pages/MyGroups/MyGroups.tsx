import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../../ui/Panel/Panel";
import CTopBack from "../../ui/CTopBack/CTopBack";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({ container: {} });

const TAG = "MY GROUPS";
type MyGroupsProps = {
  style?: StyleProp<ViewStyle>;
};
const MyGroups: React.FC<MyGroupsProps> = ({ style }) => {
  const navigation = useNavigation();
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack title="My Groups" onBackPress={() => navigation.goBack()} />
    </Panel>
  );
};
export default MyGroups;
