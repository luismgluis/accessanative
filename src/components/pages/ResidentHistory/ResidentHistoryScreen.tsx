import React, { useRef } from "react";
import { ResidentType } from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import ResidentHistory from "./ResidentHistory";

const TAG = "RESIDENT INFO SCREEN";
type ResidentHistoryScreenProps = {
  route: any;
};
const ResidentHistoryScreen: React.FC<ResidentHistoryScreenProps> = ({
  route,
}) => {
  const residentInfoRef = useRef(() => {
    console.log(TAG, route);
    const info: ResidentType = route.params.resident;
    if (!utils.objects.isEmpty(info)) {
      return info;
    }
    return new ResidentType("", null);
  });
  console.log(TAG, residentInfoRef.current());
  /*<ResidentHistory resident={residentInfoRef.current()} /> */
  return <ResidentHistory resident={residentInfoRef.current()} />;
};
export default ResidentHistoryScreen;
