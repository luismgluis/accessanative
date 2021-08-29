import React, { useRef } from "react";
import { Text, View } from "react-native";
import { ResidentType } from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import Panel from "../../ui/Panel/Panel";
import ResidentInfo from "./ResidentInfo";

const TAG = "RESIDENT INFO SCREEN";
type ResidentInfoScreenProps = {
  route: any;
};
const ResidentInfoScreen: React.FC<ResidentInfoScreenProps> = ({ route }) => {
  const residentInfoRef = useRef(() => {
    console.log(TAG, route);
    const info: ResidentType = route.params.resident;
    if (!utils.objects.isEmpty(info)) {
      return info;
    }
    return new ResidentType("", null);
  });
  return <ResidentInfo resident={residentInfoRef.current()} />;
};
export default ResidentInfoScreen;
