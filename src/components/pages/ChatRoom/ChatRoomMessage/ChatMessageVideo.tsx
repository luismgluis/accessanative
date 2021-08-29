import { Dimensions, View, Text } from "react-native";
import React from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";

import styles from "./ChatMessageStyles";
import api from "../../../../libs/api/api";

const TAG = "CHAT MESSAGE VIDEO";
type ChatMessageVideoProps = {
  msj: RoomMessageType;
  isme: boolean;
};
const ChatMessageVideo: React.FC<ChatMessageVideoProps> = ({ msj }) => {
  let panelImageStyles = {
    ...styles.panelImage,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  };
  const isme: boolean = msj.creator === api.users.currentUser.id;
  if (isme) {
    panelImageStyles = {
      ...panelImageStyles,
      ...styles.mePanelBorder,
    };
  } else {
    panelImageStyles = {
      ...panelImageStyles,
      ...styles.otherPanelborder,
    };
  }
  const imageStyles = {
    ...styles.image,
    maxwidth: Dimensions.get("screen").width * 0.8,
    height: (Dimensions.get("screen").height / 10) * 4 + 50,
    width: Dimensions.get("screen").width * 0.8,
  };
  return <View style={panelImageStyles} />;
};
export default ChatMessageVideo;
