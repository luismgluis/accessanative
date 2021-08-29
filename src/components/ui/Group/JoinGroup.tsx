import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";
import api from "../../../libs/api/api";

import GroupType from "../../../libs/types/GroupType";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import { useAbc } from "../../hooks/useAbc";

const styles = StyleSheet.create({ container: {} });

const TAG = "JOIN GROUP";
type JoinGroupProps = {
  style?: StyleProp<ViewStyle>;
  callBack: (data: GroupType | null) => void;
};
const JoinGroup: React.FC<JoinGroupProps> = ({ style, callBack }) => {
  const abc = useAbc().abc.JoinGroup;
  const [groupText, setGroupText] = useState("");
  const [loading, setLoading] = useState(false);
  const onSearch = (at: string) => {
    setLoading(true);
    const atTransformed = at.replace(" ", "").replace("@", "").toLowerCase();
    console.log(TAG, "search", atTransformed);
    api.group
      .searchGroupByAt(atTransformed)
      .then((res) => {
        if (res.length > 0) {
          callBack(res[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(TAG, "err", err);
      });
  };
  return (
    <Panel verticalCenter={true} horizontalCenter={true} paddingHorizontal={50}>
      <Text category="h3">{abc.joinGroup}</Text>
      <Text category="h6">{abc.writeGroup}</Text>
      <CInput
        value={groupText}
        onChangeText={(t) => setGroupText(t)}
        placeholder="@business123"
        label="At :"
        paddingVertical={30}
        caption={abc.youCanGlobal}
      />
      {!loading && (
        <>
          <CButton
            text={abc.searchButton}
            onPress={() => onSearch(groupText)}
          />
          <CButton
            text={abc.backButton}
            appeareance="ghost"
            paddingVertical={10}
            onPress={() => callBack(null)}
          />
        </>
      )}
      {loading && <LoadingPanel text={abc.search} />}
    </Panel>
  );
};
export default JoinGroup;
