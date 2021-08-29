import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ChannelType } from "../../../libs/types/ChannelType";
import { ChannelsListItem } from "../../pages/Home/HomeModule";
import Panel from "../Panel/Panel";
import ListChannelItem from "./ListChannelsItem";
const TAG = "LIST CHANNELS";

const styles = StyleSheet.create({ container: { height: 50 } });

interface ListChannelsProps {
  pageSelected: number;
  channelsList: ChannelsListItem[];
  onChange: (channel: ChannelsListItem) => void;
}

const ListChannels: React.FC<ListChannelsProps> = ({
  pageSelected,
  onChange,
  channelsList,
}) => {
  const [listItemSelected, setChannelSelected] = useState<ChannelsListItem>({
    index: 0,
    key: "",
    withIcon: false,
    module: "channel",
    channel: new ChannelType("", null),
  });

  const changeSelection = useCallback(
    (channel: ChannelsListItem) => {
      console.log(TAG, "channel", channel);
      setChannelSelected(channel);
      onChange(channel);
    },
    [setChannelSelected, onChange],
  );

  useEffect(() => {
    if (channelsList.length > 0 && listItemSelected.key == null) {
      for (const key in channelsList) {
        const item = channelsList[key];
        if (item.module === "channel") {
          changeSelection(item);
          return;
        }
      }
    }
  }, [channelsList, listItemSelected, changeSelection]);

  const getUnderline = useCallback(
    (listItem: ChannelsListItem) => pageSelected === listItem.index,
    [pageSelected],
  );

  return (
    <Panel level="4" style={styles.container}>
      <FlatList
        horizontal={true}
        data={channelsList}
        renderItem={(item) => (
          <ListChannelItem
            underline={getUnderline(item.item)}
            onPress={(channelItem) => changeSelection(channelItem)}
            listItem={item.item}
          />
        )}
      />
    </Panel>
  );
};
export default ListChannels;
