import { StyleSheet } from "react-native";
import React from "react";
import Panel from "../../ui/Panel/Panel";
import { useNavigation } from "@react-navigation/native";
import { ResidentType } from "../../../libs/types/ResidentType";
import CTopBack from "../../ui/CTopBack/CTopBack";
import UsersRegister from "../../ui/UsersRegister/UsersRegister";
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
  const abc = useAbc().abc.ResidentInfo;
  const navigation = useNavigation();
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack title={abc.userInfo} onBackPress={() => navigation.goBack()} />
      <UsersRegister residentInfo={resident} />
    </Panel>
  );
};
export default ResidentInfo;
