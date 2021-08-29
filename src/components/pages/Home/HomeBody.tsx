import { StyleSheet, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PagerView from "react-native-pager-view";
import ListChannels from "../../ui/Channels/ListChannels";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import Panel from "../../ui/Panel/Panel";
import { ChannelsListItem } from "./HomeModule";
import ChatRoom from "../ChatRoom/ChatRoom";
import UsersAccess from "../../ui/UsersAccess/UsersAccess";
import UsersHistory from "../../ui/UsersHistory/UsersHistory";
import UsersRegister from "../../ui/UsersRegister/UsersRegister";
import { useSetHomeConfig } from "../../hooks/useHomeConfig";
import { HomeConfigRedux } from "../../../reducers/generalValues";
const styles = StyleSheet.create({
  pagerView: {
    // flex: 12,
    backgroundColor: "red",
  },
  flexx: {
    flex: 12,
    backgroundColor: "red",
  },
});

const TAG = "HOME BODY";
type HomeBodyProps = {
  channelsListItems: ChannelsListItem[];
};

const HomeBody: React.FC<HomeBodyProps> = ({ channelsListItems }) => {
  const group = useCurrentGroup();
  const pagerViewRef = useRef<any>();
  const [pagerSelected, setPagerSelected] = useState(0);
  const setHomeConfig = useSetHomeConfig();
  const onChangeListChannels = useCallback((listItem: ChannelsListItem) => {
    pagerViewRef.current?.setPage(listItem.index);
    setPagerSelected(listItem.index);
  }, []);

  useEffect(() => {
    const config: HomeConfigRedux = {
      pageSelected: pagerSelected,
    };
    setHomeConfig(config);
  }, [pagerSelected]);

  const pagesOfPagerView = useMemo(() => {
    return channelsListItems.map((item, index) => {
      let element: any = null;
      let theKey = `${group.id}-${item.module}`;
      console.log(TAG, "renderpages");
      if (item.module === "channel") {
        theKey += item.channel!.chatRoomID;
        element = (
          <ChatRoom
            key={`${theKey}`}
            idRoom={item.channel!.chatRoomID}
            parentHome={true}
            indexHome={index}
          />
        );
      } else if (item.module === "access") {
        element = <UsersAccess key={theKey} pagerFocus={true} />;
      } else if (item.module === "history") {
        element = <UsersHistory key={theKey} pagerFocus={true} />;
      } else if (item.module === "register") {
        element = <UsersRegister key={theKey} pagerFocus={true} />;
      } else {
        element = <></>;
      }
      return <View key={"PagerView" + theKey}>{element}</View>;
    });
  }, [channelsListItems]);

  return (
    <Panel level="5" flex={12}>
      {channelsListItems.length > 0 && (
        <ListChannels
          channelsList={channelsListItems}
          pageSelected={pagerSelected}
          onChange={(listItem) => onChangeListChannels(listItem)}
        />
      )}
      {!group.isEmpty() && channelsListItems.length > 0 && (
        <PagerView
          ref={pagerViewRef}
          style={{
            flex: 12,
            flexDirection: "row",
            padding: 0,
            width: "100%",
            height: "100%",
          }}
          scrollEnabled={true}
          onPageSelected={(e) => setPagerSelected(e.nativeEvent.position)}
          initialPage={pagerSelected}>
          {pagesOfPagerView}
        </PagerView>
      )}
    </Panel>
  );
};

export default HomeBody;
