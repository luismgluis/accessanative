import { StyleSheet, View, Text } from "react-native";
import React from "react";

const styles = StyleSheet.create({ container: {} });

const TAG = "CAMERA";
type CameraProps = {
  val: string;
};
const Camera: React.FC<CameraProps> = ({ val }) => {
  return (
    <View>
      <Text>Hello from Camera {val}</Text>
    </View>
  );
};
export default Camera;
