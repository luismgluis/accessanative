import { StyleSheet, StyleProp, ViewStyle, FlatList } from "react-native";
import React, { useEffect, useRef } from "react";
import Panel from "../../Panel/Panel";
import QRScanner from "../../QRScanner/QRScanner";
import { UserAccessModule } from "../UserAccessModule";
import { Spinner, Toggle } from "@ui-kitten/components/ui";
import { useState } from "react";
import { ResidentType } from "../../../../libs/types/ResidentType";
import UsersInfoListItem from "../../UsersInfo/UsersInfoListItem";
import CButton from "../../CButton/CButton";
import CText from "../../CText/CText";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import CheckIcon from "../../../Icons/others/CheckIcon";
import { useTheme } from "../../../hooks/useTheme";
import CloseIcon from "../../../Icons/others/CloseIcon";
import UserAccessQr from "./UserAccessQr";
import { useCallback } from "react";
import utils from "../../../../libs/utils/utils";

const styles = StyleSheet.create({
  container: {},
  flatList: {
    paddingVertical: 10,
  },
});

const TAG = "USER ACCESS FLASH";

type RegisterType = "entry" | "exit";

type FlashItem = {
  resident: ResidentType;
  type: RegisterType;
  comment?: string;
};

type UserAccessFlashItemProps = {
  flashItem: FlashItem;
  index?: number;
};

const UserAccessFlashItem: React.FC<UserAccessFlashItemProps> = ({
  flashItem,
  index = 0,
}) => {
  const theme = useTheme();
  const me = useCurrentUser();
  const module = useRef(new UserAccessModule()).current;
  const [saved, setSaved] = useState<null | boolean>(true);

  // useEffect(() => {
  //   if (saved === null) {
  //     const exx = flashItem.type === "exit";
  //     module
  //       .saveEntryFlash(me, flashItem.resident, exx)
  //       .then((data) => {
  //         setSaved(true);
  //         console.log(TAG, "ok save access", data);
  //       })
  //       .catch((err) => {
  //         setSaved(false);
  //         console.log(TAG, "fail save access", err);
  //       });
  //   }
  //   return () => {};
  // }, [saved, flashItem]);
  //level = { index % 2 === 0 ? "6" : "5"}
  return (
    <Panel flexDirection="row" level={index % 2 === 0 ? "5" : "6"}>
      <Panel flex={12}>
        <UsersInfoListItem resident={flashItem.resident} />
      </Panel>
      <Panel totalHeight={"80px"}>
        <Panel totalHeight="60px" horizontalCenter={true}>
          {saved === true && (
            <CButton
              imageInsertComponent={() => (
                <CheckIcon
                  color={theme.colors["color-primary-600"]}
                  width={30}
                />
              )}
              onPress={() => null}></CButton>
          )}
          {saved === false && (
            <CButton
              imageInsertComponent={() => (
                <CloseIcon
                  color={theme.colors["color-primary-600"]}
                  width={25}
                  height={25}
                />
              )}
              onPress={() => null}></CButton>
          )}
          {saved === null && <Spinner size="giant" />}
        </Panel>
        <Panel horizontalCenter={true}>
          <CText>{flashItem.type === "exit" ? "Salió 💨" : "Entró 🚪🚶"}</CText>
        </Panel>
      </Panel>
    </Panel>
  );
};

type UserAccessFlashProps = {
  style?: StyleProp<ViewStyle>;
};

const UserAccessFlash: React.FC<UserAccessFlashProps> = ({ style }) => {
  const [registerType, setRegisterType] = useState<RegisterType>("entry");
  const currentRegisterType = useRef<RegisterType>("entry");
  const [arrResiRegistered, setArrResiRegistered] = useState<FlashItem[]>([]);
  const currentArr = useRef<FlashItem[]>([]);
  const me = useCurrentUser();
  const module = useRef(new UserAccessModule()).current;

  const saveEntry = useCallback(
    (flashItem: FlashItem) => {
      const exx = flashItem.type === "exit";
      module
        .saveEntryFlash(me, flashItem.resident, exx)
        .then((data) => {
          // setSaved(true);
          console.log(TAG, "ok save access", data);
        })
        .catch((err) => {
          console.log(TAG, "fail save access", err);
        });
    },
    [me],
  );

  const onSuccess = useCallback(
    (resi: ResidentType | null) => {
      console.log(TAG, "on read");
      if (!resi) return;
      if (!resi.isEmpty()) {
        const newItem: FlashItem = {
          resident: resi,
          type: currentRegisterType.current,
          comment: currentArr.current.length + 1 + "",
        };
        const newArr = currentArr.current.slice();
        newArr.unshift(newItem);
        setArrResiRegistered(newArr);

        currentArr.current = newArr;
        saveEntry(newItem);
      }
    },
    [arrResiRegistered, currentRegisterType],
  );

  // useEffect(() => {
  //   currentRegisterType.current = registerType;
  // }, [currentRegisterType, registerType]);

  const changeToggles = useCallback(() => {
    if (registerType === "exit") {
      setRegisterType("entry");
      currentRegisterType.current = "entry";
      return;
    }
    setRegisterType("exit");
    currentRegisterType.current = "exit";
  }, [registerType]);
  console.log(TAG, registerType);
  return (
    <Panel level="5" flex={1} style={style}>
      <Panel totalHeight="30%">
        <UserAccessQr onResult={(data) => onSuccess(data)} />
        {/* <QRScanner onRead={(data) => onQRRead(data)} /> */}
      </Panel>
      <Panel level="6" flexDirection="row" paddingVertical={15}>
        <Panel flex={6} verticalCenter={true}>
          <Toggle
            checked={registerType === "entry"}
            onChange={() => changeToggles()}>
            {"Entrada"}
          </Toggle>
        </Panel>
        <Panel flex={6} verticalCenter={true}>
          <Toggle
            checked={registerType === "exit"}
            onChange={() => changeToggles()}>
            {"Salida"}
          </Toggle>
        </Panel>
      </Panel>
      <Panel level="5" flex={12}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={arrResiRegistered}
          renderItem={({ item, index }) => (
            <UserAccessFlashItem flashItem={item} index={index} />
          )}
          keyExtractor={(item, index) => `flash${item.resident.id}${index}`}
          keyboardShouldPersistTaps="always"
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          maxToRenderPerBatch={5}
        />
      </Panel>
    </Panel>
  );
};
export default UserAccessFlash;
