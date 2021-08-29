import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ResidentAccess, ResidentType } from "../../../libs/types/ResidentType";
import api from "../../../libs/api/api";
import UsersInfoListItem from "../UsersInfo/UsersInfoListItem";
import { Text } from "@ui-kitten/components";
import Panel from "../Panel/Panel";
import utils from "../../../libs/utils/utils";
import CAvatar from "../CAvatar/CAvatar";
import CText from "../CText/CText";
import { useNavigation } from "@react-navigation/native";
import CButton from "../CButton/CButton";
import FormIcon from "../../Icons/Home/FormIcon";
import { useNavigatorGoTo } from "../../hooks/useNavigatorGoTo";
import { useTheme } from "../../hooks/useTheme";
import { useRef } from "react";
import { useMemo } from "react";
import { acc } from "react-native-reanimated";
import { useSearchResident } from "../../hooks/useSearchResident";
import { useAbc } from "../../hooks/useAbc";

const TAG = "USERS HISTORY LIST ITEM";
type UsersHistoryListItemProps = {
  access: ResidentAccess;
  index: number;
  filterText: string;
  detailsButton?: boolean;
};
const UsersHistoryListItem: React.FC<UsersHistoryListItemProps> = ({
  access,
  index,
  filterText = "",
  detailsButton = true,
}) => {
  if (typeof access === "undefined") {
    console.log(TAG, "undefffff");
    return <></>;
  }
  const abc = useAbc().abc.accessHistoryItem;

  const goTo = useNavigatorGoTo();
  const theme = useTheme();

  const residentInfo = useSearchResident("id", access.idResident, true);

  const accessDate = useMemo(
    () => utils.dates.unixToString(access.creationDate!, true),
    [access],
  );
  const [hourDays, setHourDays] = useState("");

  useEffect(() => {
    console.log(TAG, access);
    const setHoursDays = () => {
      const d = utils.dates.dateToDaysHoursNowUnix(access.creationDate);
      setHourDays(d.text);
    };
    const timer = setInterval(setHoursDays, 1000 * 60);
    setHoursDays();
    return () => {
      clearInterval(timer);
    };
  }, [access]);

  if (!residentInfo.isEmpty() && filterText !== "") {
    let has = 0;
    if (residentInfo.name.toLocaleLowerCase().includes(filterText)) {
      has++;
    }
    if (access.sector.toLocaleLowerCase().includes(filterText)) {
      has++;
    }
    if (accessDate.toLocaleLowerCase().includes(filterText)) {
      has++;
    }
    if (has === 0) return <></>;
  }

  return (
    <View>
      <Panel
        flexDirection="row"
        level={index % 2 === 0 ? "5" : "6"}
        paddingHorizontal={15}
        paddingVertical={10}>
        <Pressable onPress={() => goTo.imageViewer(residentInfo.profileImage)}>
          <CAvatar urlImage={residentInfo.profileImage} size={55} />
          <CText>{hourDays}</CText>
        </Pressable>

        <Panel flex={1} paddingHorizontal={10}>
          <CText category="h5">{residentInfo.name}</CText>
          <CText titleText={abc.sector}>{access.sector}</CText>
          <CText titleText={abc.date}>{accessDate}</CText>
          {/* <CText titleText="phone:">{residentInfo.phone}</CText> */}
          <CText titleText={abc.type}>
            {access.exit ? abc.exit : abc.entry}
          </CText>
        </Panel>
        {detailsButton && (
          <Panel level="0">
            <CButton
              onPress={() => goTo.residentInfo(residentInfo)}
              imageInsertComponent={() => (
                <FormIcon
                  width={35}
                  color={theme.colors["color-primary-800"]}
                />
              )}
            />
          </Panel>
        )}
      </Panel>
    </View>
  );
};
export default UsersHistoryListItem;
