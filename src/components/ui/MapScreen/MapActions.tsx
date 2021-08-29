import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";

import CameraIcon from "../../Icons/others/CameraICon";
import CButton from "../CButton/CButton";
import { useTheme } from "../../hooks/useTheme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    alignItems: "center",
    flexDirection: "row",
  },
  panel: {
    flex: 1,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    borderWidth: 2,
    height: 65,
    borderColor: "red",
    padding: 10,
  },
});

const TAG = "MAP ACTIONS";
type MapActionsProps = {
  style?: StyleProp<ViewStyle>;
};
const MapActions: React.FC<MapActionsProps> = ({ style }) => {
  const theme = useTheme();
  const containerStyles = {
    ...styles.container,
    backgroundColor: theme.colors["color-primary-500"],
  };
  const buttonStyles = {
    ...styles.button,
    borderColor: theme.colors["color-primary-500"],
  };
  return (
    <View style={containerStyles}>
      <View style={styles.panel}>
        <View style={buttonStyles}>
          <CButton
            imageInsertComponent={() => (
              <CameraIcon
                color={theme.colors["color-primary-500"]}
                width={25}
                height={25}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.panel}>
        <View style={buttonStyles}>
          <CButton
            imageInsertComponent={() => (
              <CameraIcon
                color={theme.colors["color-primary-500"]}
                width={40}
                height={40}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.panel}>
        <View style={buttonStyles}>
          <CButton
            imageInsertComponent={() => (
              <CameraIcon
                color={theme.colors["color-primary-500"]}
                width={25}
                height={25}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
export default MapActions;
