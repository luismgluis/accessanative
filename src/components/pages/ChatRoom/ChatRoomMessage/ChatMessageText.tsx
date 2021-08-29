import React, { useMemo } from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import styles from "./ChatMessageStyles";
import { Text } from "@ui-kitten/components";
import api from "../../../../libs/api/api";
import ChatMessageHour from "./ChatMessageHour";
import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
const stylesTwo = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingRight: 0,
    maxWidth: 200,
  },
  panelHourText: {
    position: "absolute",
    bottom: -4,
    right: 10,
  },
});
const TAG = "CHAT MESSAGE TEXT";
type ChatMessageTextProps = {
  msj: RoomMessageType;
  isme: boolean;
};
const ChatMessageText: React.FC<ChatMessageTextProps> = ({ msj, isme }) => {
  const theme = useTheme();

  let textStyles = { ...styles.textStyles };

  if (!isme) {
    textStyles = {
      ...textStyles,
      color: theme.colors["color-primary-800"],
    };
  } else {
    textStyles = {
      ...textStyles,
      color: theme.colors["color-bg-100"],
    };
  }

  const containerStyles = useMemo(() => {
    const msjText = msj.text ? msj.text : "";
    if (msjText.length * 5 < Dimensions.get("screen").width * 0.8) {
      return {
        ...stylesTwo.container,
        maxWidth: Dimensions.get("screen").width * 0.8,
        paddingRight: 30,
        paddingBottom: 3,
      };
    }
    return {
      ...stylesTwo.container,
      maxWidth: Dimensions.get("screen").width * 0.8,
    };
  }, [msj]);

  return (
    <View style={containerStyles}>
      {msj.type === "text" && (
        <Text style={textStyles} category="h5">
          {msj.text}
        </Text>
      )}
      <View style={stylesTwo.panelHourText}>
        <ChatMessageHour msj={msj} isme={isme} />
      </View>
    </View>
  );
};
export default ChatMessageText;
