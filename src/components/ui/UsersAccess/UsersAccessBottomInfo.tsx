import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import CButton from "../CButton/CButton";

import { Text } from "@ui-kitten/components";
import Panel from "../Panel/Panel";
import UsersInfo from "../UsersInfo/UsersInfo";
import { ResidentAccess, ResidentType } from "../../../libs/types/ResidentType";
import { UserAccessModule } from "./UserAccessModule";
import utils from "../../../libs/utils/utils";
import { telegramMessage } from "../../../libs/api/apiResidents";
import CText from "../CText/CText";
import { useAbc } from "../../hooks/useAbc";

const styles = StyleSheet.create({
  container: { flex: 1 },
  panelOptions: {
    //height: 60,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 5,
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  userInfoPanel: {
    width: "100%",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  panelOptionsButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
  },
  panelBottom: { bottom: 0 },
  lastAccessPanel: {
    alignItems: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  panelSectorAction: { flexDirection: "row" },
  customTextTitle: { fontWeight: "700" },
});
const CustomText: React.FC<any> = ({ title = "", value = "", flex = null }) => {
  const customStyle = { flex: flex ? 1 : undefined };
  return (
    <Text style={customStyle} category="h6">
      <Text style={styles.customTextTitle} category="h6">
        {title + ":"}
      </Text>{" "}
      {value}
    </Text>
  );
};
const TAG = "USERS ACCESS BOTTOM INFO";
const module = new UserAccessModule();
type UsersAccessTopSearchProps = {
  style?: StyleProp<ViewStyle>;
  userResident: ResidentType;
  onClean: () => void;
};
const UsersAccessTopSearch: React.FC<UsersAccessTopSearchProps> = ({
  userResident,
  onClean,
}) => {
  const dicc = useAbc().abc.UsersAccess;
  const [lastEntryInfo, setLastEntryInfo] = useState(
    new ResidentAccess("", null),
  );
  const [lastEntryDate, setLastEntryDate] = useState("");
  const [telegramMessage, setTelegramMessage] = useState<telegramMessage>();

  useEffect(() => {
    console.log(TAG, "userResident get last access");
    userResident
      .getLastAccess()
      .then((res) => {
        console.log(TAG, res);
        const d = utils.dates.unixToString(res.creationDate, true);
        setLastEntryInfo(res);
        setLastEntryDate(d);
      })
      .catch((err) => {
        console.log(TAG, "get last access err", err);
        setLastEntryInfo(new ResidentAccess("", null));
        setLastEntryDate("");
      });
    userResident.getLastTelegramMessage().then((data) => {
      if (data.length > 0) setTelegramMessage(data[0]);
    });
  }, [userResident]);

  const requestAccess = () => {
    module.getResidentConfirmation(userResident, (res) => {
      if (res) onClean();
    });
  };

  const saveExit = () => {
    module.saveExit(userResident, () => {
      onClean();
    });
  };
  console.log(TAG, "telegramMessage", telegramMessage);
  return (
    <Panel level="5" style={styles.container}>
      <UsersInfo style={styles.userInfoPanel} resident={userResident} />
      <Panel level="5" style={styles.lastAccessPanel}>
        {telegramMessage && (
          <>
            <Panel level="6" width="100%" flexDirection="row">
              <Panel flex={12}>
                <CText titleText="Telegram msj:">
                  {telegramMessage.message}
                </CText>
              </Panel>
              <Panel width={40}>
                <CText
                  titleText={
                    utils.dates.dateToDaysHoursNowUnix(
                      telegramMessage.creationDate,
                    ).text
                  }
                />
              </Panel>
            </Panel>
          </>
        )}
        {!lastEntryInfo.isEmpty() && (
          <>
            <View style={styles.panelSectorAction}>
              <CustomText
                flex={1}
                title={dicc.sector}
                value={lastEntryInfo.sector}
              />
              <CustomText
                flex={1}
                title={dicc.action}
                value={lastEntryInfo.exit ? dicc.exit : dicc.entry}
              />
            </View>
            <CustomText title={dicc.date} value={lastEntryDate} />
            <CustomText title={dicc.comment} value={lastEntryInfo.comment} />
          </>
        )}
        {lastEntryInfo.isEmpty() && (
          <Panel
            horizontalCenter={true}
            width="100%"
            paddingVertical={10}
            paddingHorizontal={20}>
            <Text category="h6">{dicc.withoutLastEntry}</Text>
          </Panel>
        )}
      </Panel>
      <Panel level="4" style={styles.panelOptions}>
        <CButton
          paddingHorizontal={20}
          text={dicc.exitButton}
          onPress={() => saveExit()}
          style={styles.panelOptionsButton}
        />
        <CButton
          paddingHorizontal={20}
          text={dicc.enterButton}
          onPress={() => requestAccess()}
          style={styles.panelOptionsButton}
        />
      </Panel>
    </Panel>
  );
};
export default UsersAccessTopSearch;
