import { StyleSheet, View, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";

import api from "../../../../libs/api/api";
import utils from "../../../../libs/utils/utils";
import ChatRoomModule from "./../ChatRoomModule";
import CRBBButtonClip from "./CRBBButtonClip";
import CRBBButtonMicrophone from "./CRBBButtonMicrophone";
import CRBBButtonSend from "./CRBBButtonSend";
import CRBBButtonMedia from "./CRBBButtonMedia";
import { InvokeGallery } from "../../Gallery/GalleryModule";
import Panel from "../../../ui/Panel/Panel";
import { useTheme } from "../../../hooks/useTheme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 9999999,
  },
  containerRow: { flexDirection: "row" },
  panelInput: {
    flex: 1,
    borderRightWidth: 3,
  },
  input: {
    backgroundColor: "red",
    borderColor: "blue",
    margin: 0,
    padding: 0,
    color: "white",
    height: 50,
    fontSize: 16,
  },
  buttonPanel: {
    padding: 3,
    alignContent: "center",
    justifyContent: "center",
  },
});

const module = new ChatRoomModule();
const TAG = "CHAT ROOM BOTTOM BANNER";
type ChatRoomBottomBannerProps = {
  onSend: (msj: RoomMessageType) => void;
  onFocus?: () => void;
};
const ChatRoomBottomBanner: React.FC<ChatRoomBottomBannerProps> = ({
  onSend,
  onFocus,
}) => {
  const theme = useTheme();
  const [message, setMessage] = useState<RoomMessageType>(
    new RoomMessageType("", { creator: api.users.currentUser.id }),
  );
  const [textMessage, setTextMessage] = useState("");
  const [menuTopVisible, setMenuTopVisible] = useState(false);
  const sendTextMessage = () => {
    setMessage(module.getMessageCleanClone(message));
    message.setMessageID(utils.generateKey("tempMessage"));
    message.setText(textMessage);
    setTextMessage("");
    onSend(message);
  };

  const goGallery = InvokeGallery((data) => {
    message.setMessageID(utils.generateKey("tempMessage"));
    message.setFileUpload(false);
    if (data.isVideo) {
      message.setVideo(data.uri, data.duration!);
    } else {
      message.setImage(data.uri, data.dimensions!);
    }
    onSend(message);
  });

  const inpuStyles = {
    ...styles.input,
    backgroundColor: theme.colors["color-basic-500"],
    borderColor: theme.colors["color-basic-500"],
    color: theme.colors["color-basic-800"],
  };
  const panelInputStyles = {
    ...styles.panelInput,
    borderColor: theme.colors["color-primary-600"],
  };

  const customFocus = useCallback(
    (e) => {
      if (onFocus) onFocus();
    },
    [onFocus],
  );

  return (
    <Panel style={styles.container} level="5">
      {menuTopVisible && (
        <Panel style={styles.containerRow} level="4">
          <CRBBButtonMedia onPress={goGallery} cstyles={styles.buttonPanel} />
        </Panel>
      )}
      <View style={styles.containerRow}>
        <CRBBButtonClip
          onPress={() => setMenuTopVisible(!menuTopVisible)}
          cstyles={styles.buttonPanel}
        />
        <View style={panelInputStyles}>
          <TextInput
            placeholderTextColor={theme.colors["color-primary-500"]}
            placeholder="Message"
            style={inpuStyles}
            onFocus={(e) => customFocus(e)}
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
          />
        </View>
        {textMessage === "" && (
          <CRBBButtonMicrophone onSend={onSend} cstyles={styles.buttonPanel} />
        )}
        {textMessage !== "" && (
          <CRBBButtonSend
            onPress={sendTextMessage}
            cstyles={styles.buttonPanel}
          />
        )}
      </View>
    </Panel>
  );
};
export default ChatRoomBottomBanner;
