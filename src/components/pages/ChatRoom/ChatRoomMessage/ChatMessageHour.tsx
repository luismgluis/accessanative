import { Text, StyleProp, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import api from "../../../../libs/api/api";

import utils from "../../../../libs/utils/utils";
import { useTheme } from "../../../hooks/useTheme";

const TAG = "CHAT MESSAGE HOUR";
type ChatMessageHourProps = {
  style?: StyleProp<ViewStyle>;
  msj: RoomMessageType;
  isme: boolean;
};
const ChatMessageHour: React.FC<ChatMessageHourProps> = ({
  style,
  msj,
  isme,
}) => {
  const hourText = useMemo(() => {
    const strDate = utils.dates.unixToString(msj.creationDate!, true);
    return strDate.split(" ")[1];
  }, [msj]);
  const theme = useTheme();
  const textStyles = useMemo(() => {
    return {
      color: !isme
        ? theme.colors["color-basic-600"]
        : theme.colors["color-primary-200"],
      fontSize: 12,
    };
  }, [msj, theme]);
  return <Text style={textStyles}>{hourText}</Text>;
};
export default ChatMessageHour;
