import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import CButton from "../CButton/CButton";

import QrCodeIcon from "../../Icons/UsersAccess/QrCodeIcon";

import Panel from "../Panel/Panel";

import UserAccessSearch from "./UserAccessSearch/UserAccessSearch";
import { ResidentType } from "../../../libs/types/ResidentType";
import HomeSearchIcon from "../../Icons/UsersAccess/HomeSearchIcon";
import IdCardIcon from "../../Icons/UsersAccess/IdCardIcon";
import QRScanner from "../QRScanner/QRScanner";
import CarIcon from "../../Icons/UsersAccess/CarIcon";
import { useTheme } from "../../hooks/useTheme";
import api from "../../../libs/api/api";
import { CAlertInfo, CAlertLoading } from "../CAlert/CAlertNotification";
import FlashIcon from "../../Icons/UsersAccess/FlashIcon";
import UserAccessFlash from "./UserAccessSearch/UserAccessFlash";
import { useRef } from "react";
import { UserAccessModule } from "./UserAccessModule";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import UserAccessQr from "./UserAccessSearch/UserAccessQr";

const styles = StyleSheet.create({
  container: { flex: 1 },
  panelOptions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: 10,
  },
  panelOptionsButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 10,
  },
});
const TAG = "USERS ACCESS TOP SEARCH";
type ButtonOptionType = {
  onPress: () => void;
  selected: boolean;
  iconComponent: any;
};
const ButtonOption: React.FC<ButtonOptionType> = ({
  onPress,
  selected,
  iconComponent,
}) => {
  const theme = useTheme();
  const buttonStyles = {
    ...styles.panelOptionsButton,
    borderBottomColor: theme.colors["color-primary-500"],
    borderBottomWidth: selected ? 3 : 0,
  };
  return (
    <CButton
      onPress={onPress}
      style={buttonStyles}
      imageInsertComponent={iconComponent}
    />
  );
};

type UsersAccessTopSearchProps = {
  style?: StyleProp<ViewStyle>;
  onResult: (u: ResidentType | null) => void;
};
type SearchOptions = "idCard" | "qr" | "vehicle" | "sector" | "flash";
const UsersAccessTopSearch: React.FC<UsersAccessTopSearchProps> = ({
  onResult,
}) => {
  const theme = useTheme();
  const buttonsOptionsSize = 50;
  const group = useCurrentGroup();
  const user = useCurrentUser();
  const [searchSelected, setSearchSelected] = useState<SearchOptions>("idCard");

  const onSuccess = (data: ResidentType | null) => {
    console.log(TAG, data);
    onResult(data);
    //callBack(data); <QRScanner onRead={(text) => onQRRead(text)} />
  };

  return (
    <Panel
      style={{ minHeight: 180 }}
      totalHeight={searchSelected !== "flash" ? "40%" : 100}>
      {searchSelected !== "flash" && (
        <Panel level="3" style={styles.container}>
          {searchSelected === "qr" && (
            <UserAccessQr onResult={onSuccess} cancelButton />
          )}
          {searchSelected === "idCard" && (
            <UserAccessSearch onResult={onSuccess} inputType="idCard" />
          )}
          {searchSelected === "sector" && (
            <UserAccessSearch onResult={onSuccess} inputType="sector" />
          )}
          {searchSelected === "vehicle" && (
            <UserAccessSearch onResult={onSuccess} inputType="vehicle" />
          )}
        </Panel>
      )}
      {searchSelected === "flash" && (
        <UserAccessFlash key={`UserAccessFlash${group.id}-${group.id}`} />
      )}
      <Panel style={styles.panelOptions} level="5">
        <ButtonOption
          selected={searchSelected === "qr"}
          iconComponent={
            <QrCodeIcon
              color={theme.colors["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("qr")}
        />
        <ButtonOption
          selected={searchSelected === "idCard"}
          iconComponent={
            <IdCardIcon
              color={theme.colors["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("idCard")}
        />
        <ButtonOption
          selected={searchSelected === "sector"}
          iconComponent={
            <HomeSearchIcon
              color={theme.colors["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("sector")}
        />
        <ButtonOption
          selected={searchSelected === "vehicle"}
          iconComponent={
            <CarIcon
              color={theme.colors["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("vehicle")}
        />
        <ButtonOption
          selected={searchSelected === "flash"}
          iconComponent={
            <FlashIcon
              color={theme.colors["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => {
            setSearchSelected("flash");
            onResult(new ResidentType("", null));
          }}
        />
      </Panel>
    </Panel>
  );
};
export default UsersAccessTopSearch;
