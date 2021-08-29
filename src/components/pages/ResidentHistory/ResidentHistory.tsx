import { StyleSheet } from "react-native";
import React from "react";
import Panel from "../../ui/Panel/Panel";
import { useNavigation } from "@react-navigation/native";
import { ResidentType } from "../../../libs/types/ResidentType";
import CTopBack from "../../ui/CTopBack/CTopBack";
import UsersHistory from "../../ui/UsersHistory/UsersHistory";
import { useAbc } from "../../hooks/useAbc";

const styles = StyleSheet.create({
  container: {},
  panelQr: {
    width: 50,
    height: 50,
  },
});

const TAG = "RESIDENT INFO";
type ResidentInfoProps = {
  resident: ResidentType;
};
const ResidentInfo: React.FC<ResidentInfoProps> = ({ resident }) => {
  const abc = useAbc().abc.ResidentHistory;
  const navigation = useNavigation();
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack
        title={abc.accessHistory}
        onBackPress={() => navigation.goBack()}
      />
      <UsersHistory residentInfo={resident} />
    </Panel>
  );
};
export default ResidentInfo;
