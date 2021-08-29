import { View } from "react-native";
import React from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import api from "../../../../libs/api/api";

import styles from "./ChatMessageStyles";
import UserType from "../../../../libs/types/UserType";
import CAvatar from "../../../ui/CAvatar/CAvatar";

const TAG = "CHAT MESSAGE AVATAR";

type ChatMessageAvatarProps = {
  msj: RoomMessageType;
  user: UserType;
  updateViewCounter: number;
  isme: boolean;
};
const ChatMessageAvatar: React.FC<ChatMessageAvatarProps> = ({
  msj,
  user,
  isme,
  updateViewCounter,
}) => {
  const showElement = React.useMemo(() => {
    if (!isNaN(updateViewCounter) && msj.isVisibleMessage) {
      return msj.firstMessage || msj.lastMessage;
    }
    return false;
  }, [msj, updateViewCounter]);
  const avatarStyles = { ...styles.avatarStyles };

  if (!showElement) {
    avatarStyles.height = 0;
  }

  return (
    <>
      {!isme && (
        <View style={avatarStyles}>
          {showElement && user.profileImage !== "" && (
            <CAvatar urlImage={user.profileImage!} />
          )}
        </View>
      )}
    </>
  );
};
export default ChatMessageAvatar;
