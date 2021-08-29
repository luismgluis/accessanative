import { StyleSheet, View, Text, ViewProps } from "react-native";
import React from "react";
import CButton from "../../../ui/CButton/CButton";

import SendIcon from "../../../Icons/ChatRoom/SendIcon";
import { useTheme } from "../../../hooks/useTheme";

const styles = StyleSheet.create({ container: {} });

const TAG = "BUTTON CLIP";
export interface CRBBButtonClipProps extends ViewProps {
  cstyles: any;
  onPress: () => void;
}
const CRBBButtonSend: React.FC<CRBBButtonClipProps> = ({
  cstyles,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <View style={cstyles}>
      <CButton
        imageInsertComponent={() => (
          <SendIcon
            color={theme.colors["color-primary-400"]}
            colorTwo={theme.colors["color-primary-500"]}
            width={30}
            height={30}
          />
        )}
        onPress={onPress}
      />
    </View>
  );
};
export default CRBBButtonSend;
