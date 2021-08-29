import {
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ButtonProps, Text } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";
import { useTheme } from "../../hooks/useTheme";
import CText from "../CText/CText";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    color: "blue",
  },
  imageButton: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
  },
});

const TAG = "CUSTOM BUTTON";
interface CButtonProps extends ButtonProps {
  text?: string;
  appeareance?: "outline" | "ghost" | "fill";
  status?: "primary" | "danger" | "warning";
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  width?: number | undefined;
  imageInsertComponent?: React.FC<any>;
  paddingVertical?: number;
  paddingHorizontal?: number;
  isDisabled?: boolean;
  ref?: React.LegacyRef<View>;
}
const CButton: React.FC<CButtonProps> = ({
  text,
  onPress,
  style,
  status = "primary",
  width = undefined,
  appeareance = "fill",
  imageInsertComponent,
  paddingVertical = 0,
  paddingHorizontal = 0,
  isDisabled = false,
  ref,
}) => {
  const cStyles: any = styles;
  const theme = useTheme();
  const themeX: any = theme;
  const boxStyles: StyleProp<ViewStyle> = {
    flex: imageInsertComponent && !width ? 1 : undefined,
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
    width: width,
    // backgroundColor: "red",
    ...utils.objects.cloneObject(style),
  };
  const customButtonStyles: StyleProp<ViewStyle> = {
    ...styles.button,
    backgroundColor:
      appeareance === "fill" ? themeX.colors[`color-${status}-500`] : undefined,
    borderColor:
      appeareance === "fill" ? themeX.colors[`color-${status}-400`] : undefined,
  };
  const customTextStyles: any = {
    ...styles.buttonText,
    color:
      appeareance === "fill"
        ? theme.colors["color-primary-100"]
        : theme.colors["color-primary-600"],
  };

  const imageCustomStyles: StyleProp<ViewStyle> = {
    ...cStyles.imageButton,
    width: width ? width : 40,
    height: 40,
  };
  const handlePress = () => {
    if (!isDisabled && onPress) onPress();
  };
  return (
    <>
      {!imageInsertComponent && (
        <View style={boxStyles} ref={ref}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handlePress}
            style={customButtonStyles}
            disabled={isDisabled}>
            <CText category="h6" style={customTextStyles}>
              {text}
            </CText>
          </TouchableOpacity>
        </View>
      )}
      {imageInsertComponent && (
        <View style={boxStyles} ref={ref}>
          <View style={imageCustomStyles}>
            <Pressable style={imageCustomStyles} onPress={handlePress}>
              {imageInsertComponent}
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};
export default CButton;
