import { useFocusEffect } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import api from "../../../libs/api/api";
import { setCurrentReduxGroup } from "../../../reducers/actions/actionsCurrentSession";
import {
  useCurrentGroup,
  useSetCurrentGroup,
} from "../../hooks/useCurrentGroup";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useCustomBackHandler from "../../hooks/useCustomBackHandler";
import LoadingPanel from "../../ui/LoadingPanel/LoadingPanel";
import Panel from "../../ui/Panel/Panel";
import HomeBody from "./HomeBody";
import { ChannelsListItem } from "./HomeModule";
import CText from "../../ui/CText/CText";

import HomeNeeds, { HomeNeedsStateChanged } from "./HomeNeeds";
import HomeTopBar from "./HomeTopBar";
import { useAbc } from "../../hooks/useAbc";
const TAG = "HOME";
type HomeProps = {};
const styles = StyleSheet.create({ paper: {} });
const Home: React.FC<HomeProps> = (props) => {
  const abc = useAbc().abc.Home;
  const user = useCurrentUser();
  const group = useCurrentGroup();

  const [loadingText, setLoadingText] = useState(abc.loading);
  const [showSpinner, setShowSpinner] = useState(true);
  const [channelsListItems, setChannelsListItems] = useState<
    ChannelsListItem[]
  >([]);

  useFocusEffect(
    useCustomBackHandler(() => {
      console.log(TAG, "custom back");
      return true;
    }),
  );

  const onNeedsStateChange = (data: HomeNeedsStateChanged) => {
    switch (data) {
      case "joinGroup":
        setShowSpinner(false);
        setLoadingText(abc.waitingJoinGroup);
        break;
      case "loadChannels":
        setShowSpinner(true);
        setLoadingText(abc.loadingChannels);
        break;
      case "loadGroup":
        setShowSpinner(true);
        setLoadingText(abc.loadingGroup);
        break;
      default:
        break;
    }
  };
  console.log(TAG, group);
  return (
    <Panel
      level="1"
      flex={1}
      key={"GroupHomeKey" + group.id}
      style={styles.paper}>
      <HomeNeeds
        onStateChange={onNeedsStateChange}
        onChannelsListChanges={(data) => setChannelsListItems(data)}
      />
      <HomeTopBar />
      {!group.isEmpty() && <HomeBody channelsListItems={channelsListItems} />}
      {group.isEmpty() && !showSpinner && (
        <CText category="h5">{loadingText}</CText>
      )}
      {group.isEmpty() && showSpinner && <LoadingPanel text={loadingText} />}
    </Panel>
  );
};

export default Home;
