import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import React from "react";
import utils from "../../../libs/utils/utils";
import { Text, TextProps } from "@ui-kitten/components/ui";
import { useTheme } from "../../hooks/useTheme";
import Panel from "../Panel/Panel";

const TAG = "CUSTOM TEXT";
interface CTextProps extends TextProps {
  style?: StyleProp<ViewStyle>;
  titleText?: string;
}
const CText: React.FC<CTextProps> = (props) => {
  const { titleText: titleText = "" } = props;
  const theme = useTheme();
  const containerStyles: any = {
    color: theme.colors["color-basic-900"],
    ...utils.objects.cloneObject(props.style),
  };
  if (titleText !== "") {
    return (
      <Panel flexDirection="row">
        <Text style={{ fontWeight: "700", paddingRight: 5 }}>{titleText}</Text>
        <Panel flex={12}>
          <Text>{props.children}</Text>
        </Panel>
      </Panel>
    );
  }
  return (
    <Text category={props.category} style={containerStyles}>
      {props.children}
    </Text>
  );
};
export default CText;
