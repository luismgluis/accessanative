import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";

import CAvatar from "../CAvatar/CAvatar";
import { ResidentType } from "../../../libs/types/ResidentType";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../hooks/useTheme";
import CText from "../CText/CText";
import CButton from "../CButton/CButton";
import FormIcon from "../../Icons/Home/FormIcon";
import { useNavigatorGoTo } from "../../hooks/useNavigatorGoTo";
import { useAbc } from "../../hooks/useAbc";
const styles = StyleSheet.create({
  container: {},
  panelProfile: {
    flexDirection: "row",
  },
  panelProfileInfo: {
    paddingLeft: 10,
    flex: 1,
  },
  customTextTitle: { fontWeight: "700" },
  panelQr: {
    width: 50,
    height: 50,
  },
});

const TAG = "USERS INFO";
type UsersInfoProps = {
  style?: StyleProp<ViewStyle>;
  resident: ResidentType;
};
const UsersInfo: React.FC<UsersInfoProps> = ({ style, resident }) => {
  const dicc = useAbc().abc.UsersInfo;
  const theme = useTheme();
  const panelProfileStyles = {
    ...styles.panelProfile,
    ...utils.objects.cloneObject(style),
  };
  const goTo = useNavigatorGoTo();
  console.log(TAG, resident);
  return (
    <Panel style={panelProfileStyles} level="5">
      <CButton
        width={50}
        onPress={() => goTo.imageViewer(resident.profileImage)}
        imageInsertComponent={() => (
          <CAvatar urlImage={resident.profileImage} size={50} />
        )}
      />
      <View style={styles.panelProfileInfo}>
        <Text category="h5">{resident.name}</Text>
        <Panel>
          <CText titleText={dicc.type}>
            {resident.isVisitor ? dicc.visitor : dicc.resident}
          </CText>
          {!resident.isVisitor && (
            <CText titleText="Sector:">{resident.sector}</CText>
          )}
          {resident.profession !== "" && (
            <CText titleText={dicc.profession}>{resident.profession}</CText>
          )}
        </Panel>
      </View>

      <CButton
        width={50}
        onPress={() => goTo.qrViewer(resident.id, resident.name)}
        imageInsertComponent={() => (
          <QRCode
            value={resident.id}
            size={35}
            backgroundColor={theme.colors["color-bg-500"]}
            color={theme.colors["color-primary-800"]}
          />
        )}
      />
      <CButton
        width={50}
        onPress={() => goTo.residentInfo(resident)}
        imageInsertComponent={() => (
          <FormIcon width={35} color={theme.colors["color-primary-800"]} />
        )}
      />
    </Panel>
  );
};
export default UsersInfo;
