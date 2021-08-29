import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import { ResidentAccess, ResidentType } from "../../../libs/types/ResidentType";
import api from "../../../libs/api/api";
import { useAbc } from "../../hooks/useAbc";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import UsersHistoryListItem from "./UsersHistoryListItem";
import CInput from "../CInput/CInput";
import CText from "../CText/CText";
const styles = StyleSheet.create({
  container: { flex: 12 },
  flatList: {
    // flex: 12,
    paddingVertical: 10,
  },
  panelFlatList: { flex: 12, width: "100%" },
  panel: {
    flex: 1,
    width: "100%",
  },

  panelTitle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
type getMoreAccessHistoryType = {
  fn: (() => void) | (() => null);
};
const TAG = "USERS HISTORY";
type UsersHistoryProps = {
  pagerFocus?: boolean;
  residentInfo?: ResidentType | null;
};
const UsersHistory: React.FC<UsersHistoryProps> = ({ residentInfo = null }) => {
  const abc = useAbc().abc.accessHistory;
  const group = useCurrentGroup();
  const [usersHistoryList, setUsersHistoryList] = useState<
    Array<ResidentAccess>
  >([]);
  const [filterText, setFilterText] = useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [
    getMoreAccessHistory,
    setGetMoreAccessHistory,
  ] = useState<getMoreAccessHistoryType>({
    fn: () => null,
  });

  useEffect(() => {
    console.log(TAG, "effff");
    if (group.isEmpty()) return;
    const unsubs = api.residents.getAccessHistory(
      group,
      residentInfo,
      (data) => {
        setUsersHistoryList(data);
        setRefreshing(false);
      },
    );
    setGetMoreAccessHistory({ fn: unsubs.getMoreAccess });
    return () => {
      console.log(TAG, "unrender");
      unsubs.unsubs();
    };
  }, [group, residentInfo]);

  const renderItem = useCallback(
    (data: ResidentAccess, index: number) => {
      return (
        <UsersHistoryListItem
          index={index}
          filterText={filterText === null ? "" : filterText.toLowerCase()}
          access={data}
        />
      );
    },
    [filterText],
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMoreAccessHistory.fn();
    setRefreshing(false);
  }, [getMoreAccessHistory]);

  return (
    <Panel horizontalCenter={true} style={styles.container}>
      {!residentInfo && (
        <Panel style={styles.panelTitle} level="4">
          <Text category="h3">{abc.accessHistory}</Text>
        </Panel>
      )}
      <Panel totalHeight={residentInfo ? 50 : 150} style={styles.panel}>
        {usersHistoryList.length === 0 && (
          <Panel
            paddingVertical={20}
            width="100%"
            level="6"
            paddingHorizontal={20}>
            <CText category="h5">{abc.historyIsEmpty}</CText>
          </Panel>
        )}
        {usersHistoryList.length > 0 && (
          <>
            <CInput
              placeholder="Search"
              paddingVertical={10}
              paddingHorizontal={30}
              onChangeText={setFilterText}
            />
            <FlatList
              contentContainerStyle={styles.flatList}
              data={usersHistoryList}
              renderItem={(item) => renderItem(item.item, item.index)}
              keyExtractor={(item, index) => `history${item.id}${index}`}
              keyboardShouldPersistTaps="always"
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
              maxToRenderPerBatch={5}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </>
        )}
      </Panel>
    </Panel>
  );
};
export default UsersHistory;
