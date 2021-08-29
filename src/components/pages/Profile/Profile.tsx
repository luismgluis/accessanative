import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";

const styles = StyleSheet.create({ container: {} });

const TAG = "PROFILE";
type ProfileProps = {
  style?: StyleProp<ViewStyle>;
};
const Profile: React.FC<ProfileProps> = ({ style }) => {
  return (
    <View style={style}>
      <Text>Hello from Profile</Text>
    </View>
  );
};
export default Profile;
