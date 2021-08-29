import { StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatRoomBottomBanner from "./ChatRoomBottom/ChatRoomBottomBanner";

import RoomMessageType from "../../../libs/types/RoomMessageType";
import ChatRoomMessage from "./ChatRoomMessage/ChatRoomMessage";
import ChatRoomModule from "./ChatRoomModule";
import Panel from "../../ui/Panel/Panel";
import utils from "../../../libs/utils/utils";
import { useKeyboard } from "../../hooks/useKeyBoard";
import { useHomeConfig } from "../../hooks/useHomeConfig";
import CText from "../../ui/CText/CText";
import { useAbc } from "../../hooks/useAbc";
import LoadingPanel from "../../ui/LoadingPanel/LoadingPanel";

const TAG = "CHAT ROOM";

const styles = StyleSheet.create({
  container: {
    flex: 12,
    paddingBottom: 50,
  },
  flatList: { paddingBottom: 10 },
});

type ChatRoomProps = {
  idRoom: string;
  parentHome?: boolean;
  indexHome?: number;
};

const ChatRoom: React.FC<ChatRoomProps> = ({
  idRoom,
  parentHome = false,
  indexHome = 0,
}) => {
  const abc = useAbc().abc.ChatRoom;
  const homeConfig = useHomeConfig();
  const roomModule = useRef(new ChatRoomModule("")).current;
  const startValues = useRef({ keyBoardHeight: 0 }).current;
  const [renderState, setRenderState] = useState<"initial" | "show" | "hide">(
    "initial",
  );

  const myFlatList: any = useRef<FlatList<RoomMessageType>>();

  const [messages, setMessages] = useState<Array<RoomMessageType>>([]);
  const [keyboardHeight] = useKeyboard();

  const [firstMessages, setFirstMessages] = useState(false);

  const scrollDown = useCallback(async () => {
    [0, 1, 2].forEach((val) => {
      utils.timeOut(100 * val).then(() => {
        myFlatList.current?.scrollToEnd({ animated: true });
      });
    });
  }, [myFlatList]);

  useEffect(() => {
    roomModule.setRoomID(idRoom);
    const unsubs = roomModule.getMessages((data: Array<RoomMessageType>) => {
      setMessages(data);
      if (!firstMessages) {
        setFirstMessages(true);
        setTimeout(() => {
          scrollDown();
        }, 100);
      }
    });
    return () => {
      unsubs();
    };
  }, [setMessages, idRoom, firstMessages, setFirstMessages, scrollDown]);
  useEffect(() => {
    if (keyboardHeight !== 0) {
      scrollDown();
    }
  }, [keyboardHeight, scrollDown]);

  const reciveNewMessage = (msj: RoomMessageType) => {
    setMessages([...messages, msj]);
    roomModule.saveMessage(msj);
    scrollDown();
  };

  if (startValues.keyBoardHeight !== keyboardHeight) {
    scrollDown();
    startValues.keyBoardHeight = keyboardHeight;
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    roomModule
      .getOldsMessages()
      .then((res) => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, []);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems, changed }) => {
      const analice = (msj: RoomMessageType, visible = false) => {
        msj.setIsVisible(visible);
        msj.updateView!("VISIBLE");
      };
      viewableItems.forEach(
        (element: { item: any; isViewable: boolean | undefined }) => {
          analice(element.item, element.isViewable);
        },
      );
    },
    [],
  );

  useEffect(() => {
    if (parentHome) {
      if (homeConfig.pageSelected !== indexHome) {
        if (renderState !== "hide" && renderState !== "show")
          setRenderState("hide");
        return;
      }
      if (renderState !== "show") {
        setTimeout(() => {
          setRenderState("show");
        }, 50);
      }
    }
  }, [homeConfig, renderState]);

  if (parentHome) {
    if (renderState === "initial")
      return (
        <Panel style={styles.container}>
          <LoadingPanel text={abc.loading + " chat..."}></LoadingPanel>
        </Panel>
      );
    if (renderState === "hide")
      return (
        <Panel style={styles.container}>
          <LoadingPanel text={abc.loadingChat}></LoadingPanel>
        </Panel>
      );
  }

  return (
    <Panel
      level="2"
      style={styles.container}
      key={`ChatRoomContainer_Room${idRoom}`}>
      {messages.length > 0 && (
        <FlatList
          ref={myFlatList}
          contentContainerStyle={styles.flatList}
          data={messages}
          renderItem={(item) => (
            <ChatRoomMessage chatRoomModule={roomModule} msj={item.item} />
          )}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          // onEndReached={() => onRefresh()}
          onEndReachedThreshold={1}
        />
      )}
      {messages.length === 0 && (
        <Panel horizontalCenter={true} paddingVertical={30}>
          <CText category="h5">
            {firstMessages ? abc.withoutMessages : abc.loading}
          </CText>
        </Panel>
      )}
      <ChatRoomBottomBanner
        onFocus={() => scrollDown()}
        onSend={reciveNewMessage}
      />
    </Panel>
  );
};
export default ChatRoom;
