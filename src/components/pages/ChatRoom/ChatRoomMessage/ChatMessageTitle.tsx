import { StyleSheet, View, Text } from "react-native";
import React from "react";

import styles from "./ChatMessageStyles";
import api from "../../../../libs/api/api";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import { useTheme } from "../../../hooks/useTheme";

const TAG = "CHAT MESSAGE TITLE";
type ChatMessageTitleProps = {
  msj: RoomMessageType;
  text: string;
  isme: boolean;
};
const ChatMessageTitle: React.FC<ChatMessageTitleProps> = ({
  msj,
  text,
  isme,
}) => {
  const theme = useTheme();
  const titleStyles = {
    ...styles.titleStyles,
    color: theme.colors["color-primary-700"],
  };
  let textStyles = { ...styles.textStyles };

  if (isme) {
    textStyles = {
      ...textStyles,
      color: theme.colors["color-basic-500"],
    };
    titleStyles.color = theme.colors["color-info-500"];
  } else {
    titleStyles.color = theme.colors["color-info-900"];
  }
  return <>{text !== "" && <Text style={titleStyles}>{text}</Text>}</>;
};
export default ChatMessageTitle;
