import { StyleSheet, View, StyleProp, ViewStyle, Linking } from "react-native";
import React, { useCallback, useState } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CButton from "../CButton/CButton";
import { ResidentType } from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import { UserAccessModule } from "./UserAccessModule";
import UsersInfoListItem from "../UsersInfo/UsersInfoListItem";
import CInput from "../CInput/CInput";
const styles = StyleSheet.create({
  container: {},
  panelButtons: {
    flexDirection: "row",
    width: "100%",
  },
  title: { textAlign: "center" },
});

const TAG = "USER ACCESS REQUEST ACCESS";
export type confirmationOptionsType = {
  enabled: boolean;
  typeAlert: "call" | "telegram";
  message: string;
  listener: () => void;
  answer: "YES" | "NO" | null;
};
type UserAccessRequestProps = {
  style?: StyleProp<ViewStyle>;
  onConfirm: (result: boolean) => void;
  resident: ResidentType;
  visitor: ResidentType;
};
const UserAccessRequest: React.FC<UserAccessRequestProps> = ({
  onConfirm,
  resident,
  visitor,
  style,
}) => {
  const [module, setModule] = useState(new UserAccessModule());
  const [
    confirmationOptions,
    setConfirmationOptions,
  ] = useState<confirmationOptionsType>({
    enabled: false,
    answer: null,
    typeAlert: "telegram",
    message: "",
    listener: () => null,
  });
  const [comment, setComment] = useState("");

  const openTelegram = useCallback(() => {
    setConfirmationOptions({
      ...confirmationOptions,
      message: "",
      enabled: true,
    });
    module
      .openTelegram(resident, visitor)
      .then((res) => {
        console.log(TAG, "open telegram result", res);
        setConfirmationOptions(res);
      })
      .catch((err) => console.log(TAG, err));
    //const sp = Platform.OS === "ios" ? "&" : "?";
  }, [confirmationOptions, resident, visitor, module]);

  const openCallPhone = () => {
    setConfirmationOptions({
      ...confirmationOptions,
      enabled: true,
      typeAlert: "call",
    });
    Linking.openURL(`tel:${resident.phone}`);
  };

  const styleContainer = {
    ...utils.objects.cloneObject(style),
    ...styles.container,
  };
  return (
    <Panel width="100%" totalHeight="70%" style={styleContainer}>
      {!confirmationOptions.enabled && (
        <Panel width="100%" withScroll={true} totalHeight={0}>
          <Panel verticalCenter={true} paddingVertical={0}>
            <Text style={styles.title} category="h4">
              Select Channel
            </Text>
          </Panel>
          <Panel width="100%" paddingHorizontal={20} paddingVertical={5}>
            <Text category="h5">Visitor</Text>
            <UsersInfoListItem resident={visitor} />
            <Text category="h5">Request permission to</Text>
            <UsersInfoListItem resident={resident} />
          </Panel>
          <Panel paddingHorizontal={20} paddingVertical={20}>
            <CInput
              label="Comment: "
              value={comment}
              onChangeText={setComment}
              placeholder="visitor have backpack"
            />
          </Panel>
          <Panel flexDirection="row">
            <Panel flex={1}>
              <CButton
                status="danger"
                onPress={openCallPhone}
                paddingHorizontal={20}
                text="Call Phone"
              />
            </Panel>
            {resident.telegram !== "" && (
              <Panel flex={1}>
                <CButton
                  paddingHorizontal={20}
                  onPress={openTelegram}
                  text="Telegram"
                />
              </Panel>
            )}
          </Panel>
          <Panel paddingHorizontal={40} paddingVertical={20}>
            <CButton
              status="danger"
              onPress={() => onConfirm(false)}
              paddingHorizontal={20}
              text="Cancel"
            />
          </Panel>
        </Panel>
      )}
      {confirmationOptions.enabled && (
        <>
          {confirmationOptions.typeAlert === "call" && (
            <View>
              <Panel horizontalCenter={true} paddingVertical={50}>
                <Text category="h4">Access was enabled?</Text>
              </Panel>
              <View style={styles.panelButtons}>
                <Panel flex={1}>
                  <CButton
                    paddingHorizontal={20}
                    onPress={() => onConfirm(true)}
                    text="Yes"
                  />
                </Panel>
                <Panel flex={1}>
                  <CButton
                    status="danger"
                    paddingHorizontal={20}
                    onPress={() => {
                      onConfirm(false);
                    }}
                    text="Not"
                  />
                </Panel>
              </View>
            </View>
          )}
          {confirmationOptions.typeAlert === "telegram" && (
            <Panel horizontalCenter={true}>
              {confirmationOptions.message !== "" && (
                <Text category="h3">{confirmationOptions.message}</Text>
              )}
              {confirmationOptions.message === "" && (
                <Text category="h3">Esperando respuesta...</Text>
              )}
            </Panel>
          )}
          <View>
            <Panel>
              {(confirmationOptions.answer === "NO" ||
                confirmationOptions.answer === null) && (
                <CButton
                  status="danger"
                  paddingVertical={30}
                  paddingHorizontal={80}
                  onPress={() => onConfirm(false)}
                  text="Cancel"
                />
              )}
              {confirmationOptions.answer === "YES" && (
                <CButton
                  paddingVertical={30}
                  paddingHorizontal={80}
                  onPress={() => onConfirm(true)}
                  text="Entrar"
                />
              )}
            </Panel>
          </View>
        </>
      )}
    </Panel>
  );
};
export default UserAccessRequest;
