import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Panel from "../Panel/Panel";
import {
  Icon,
  IndexPath,
  Select,
  SelectItem,
  Text,
  Toggle,
} from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";

import PerfilAvatar from "../Perfil/PerfilAvatar/PerfilAvatar";
import { UserRegisterModule } from "./UserRegisterModule";
import { useAbc } from "../../hooks/useAbc";
import { ResidentType } from "../../../libs/types/ResidentType";
import { useEffect } from "react";
import utils from "../../../libs/utils/utils";
import { useNavigatorGoTo } from "../../hooks/useNavigatorGoTo";

import VehicleRegister from "./VehicleRegister";

import { useTheme } from "../../hooks/useTheme";
import UserRegisterScannerInput from "./UserRegisterScannerInput";
import CSelect from "../CSelect/CSelect";

const styles = StyleSheet.create({
  container: {},
  panel: { width: "100%", paddingTop: 15 },
  panelTitle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  panelOne: {
    borderRadius: 20,
  },
});

const TAG = "USERS REGISTER";
type typeMask = "resident" | "visitor" | "employed" | "vehicle";

type UsersRegisterProps = {
  pagerFocus?: boolean;
  residentInfo?: ResidentType | null;
};
const UsersRegister: React.FC<UsersRegisterProps> = ({
  residentInfo = null,
}) => {
  const dicc = useAbc().abc.registerUser;

  const goTo = useNavigatorGoTo();
  const theme = useTheme();
  const [selectedTypeUser, setSelectedTypeUser] = useState(0);

  const [arrUserTypes, setArrUserTypes] = useState<string[]>([]);

  useEffect(() => {
    setArrUserTypes([
      dicc.maskResident,
      dicc.maskVisitor,
      dicc.maskEmployee,
      // dicc.maskVehicle,
    ]);
  }, [dicc]);

  const {
    form,
    onImageSelect,
    onSend,
    updateResident,
    formChange,
    checkResident,
    setCheckResident,
  } = UserRegisterModule(residentInfo);

  useEffect(() => {
    console.log(TAG, residentInfo);
    if (residentInfo !== null) {
      setCheckResident(
        utils.objects.isEmpty(residentInfo.isVisitor)
          ? false
          : !residentInfo.isVisitor!,
      );
      return;
    }
    setCheckResident(false);
  }, [residentInfo, setCheckResident]);

  return (
    <Panel horizontalCenter={true}>
      {!residentInfo && (
        <Panel style={styles.panelTitle} level="4">
          <Text category="h3">{dicc.registerUser}</Text>
        </Panel>
      )}
      <Panel totalHeight={residentInfo ? 50 : 150} style={styles.panel}>
        <Panel withScroll={true} paddingHorizontal={10}>
          <>
            <Panel level="6" horizontalCenter style={styles.panelOne}>
              <Panel
                width={"100%"}
                level="7"
                paddingVertical={20}
                paddingHorizontal={40}>
                <CSelect
                  data={arrUserTypes}
                  onChange={(data) =>
                    setCheckResident(data !== dicc.maskVisitor)
                  }
                />
              </Panel>
              <Panel
                flexDirection="row"
                horizontalCenter={true}
                paddingVertical={20}>
                <PerfilAvatar
                  title={dicc.profileImage}
                  imageUri={form.profileImage}
                  imageReference="user"
                  changeButtonEnabled={true}
                  onSelect={(data) => onImageSelect(data, "profileImage")}
                />
                <Panel paddingHorizontal={20}>
                  <PerfilAvatar
                    title={dicc.idCardImage}
                    imageUri={form.idCardImage}
                    changeButtonEnabled={true}
                    imageReference="idCard"
                    onSelect={(data) => onImageSelect(data, "idCardImage")}
                  />
                </Panel>
              </Panel>
            </Panel>
            {residentInfo && (
              <>
                <CButton
                  onPress={() =>
                    goTo.masiveMessage(
                      "Mensaje para " +
                        residentInfo!.name +
                        ", sector: " +
                        residentInfo!.sector,
                      false,
                      residentInfo!,
                    )
                  }
                  paddingVertical={10}
                  text={"Mensaje por bot"}
                />
                <CButton
                  onPress={() => goTo.residentHistory(residentInfo!)}
                  paddingVertical={10}
                  text={"Historial de accesos"}
                />
              </>
            )}

            {/* <Toggle checked={checkResident} onChange={setCheckResident}>
              {checkResident ? "Is a resident" : "Is a Visitor"}
            </Toggle> */}

            <UserRegisterScannerInput />

            <CInput
              paddingVertical={20}
              value={form.name}
              onChangeText={formChange("name")}
              label={dicc.name}
              placeholder="Jhonn Doo"
              accessoryLeft={(props) => (
                <Icon {...props} name={"person-outline"} />
              )}
            />
            <CInput
              paddingVertical={20}
              value={form.idCard}
              onChangeText={formChange("idCard", true)}
              keyboardType="numeric"
              label={dicc.idCard}
              placeholder="1122334444"
            />
            <CInput
              paddingVertical={20}
              value={form.phone}
              onChangeText={formChange("phone", true)}
              keyboardType="numeric"
              accessoryLeft={(props) => (
                <Icon {...props} name={"phone-outline"} />
              )}
              label={dicc.phone}
              placeholder="3884545"
            />
            <CInput
              paddingVertical={20}
              value={form.profession}
              onChangeText={formChange("profession")}
              keyboardType="default"
              accessoryLeft={(props) => (
                <Icon {...props} name={"award-outline"} />
              )}
              label={"Profession"}
              placeholder="Contratista Une"
            />
          </>

          {checkResident && (
            <>
              <CInput
                paddingVertical={20}
                value={form.sector}
                onChangeText={formChange("sector")}
                label={dicc.sector}
                accessoryLeft={(props) => (
                  <Icon {...props} name={"home-outline"} />
                )}
                placeholder="A201"
              />
              {/* <CInput
                paddingVertical={20}
                value={form.qr}
                onChangeText={formChange("qr")}
                accessoryLeft={(props) => (
                  <Icon {...props} name={"minus-square-outline"} />
                )}
                label={dicc.qrAssigned}
                accessoryRight={(props) => (
                  <TouchableWithoutFeedback onPress={() => goQrCamera()}>
                    <CameraIcon
                      width={25}
                      height={25}
                      color={theme.colors["color-primary-500"]}
                    />
                  </TouchableWithoutFeedback>
                )}
                placeholder="AGS123654"
              /> */}
            </>
          )}
          {!residentInfo && (
            <CButton
              onPress={() => onSend()}
              paddingVertical={20}
              text={dicc.register}
            />
          )}
          {residentInfo && (
            <>
              <VehicleRegister resident={residentInfo} />
              <CButton
                onPress={() => updateResident(residentInfo)}
                paddingVertical={20}
                text={dicc.saveChanges}
              />
            </>
          )}
          <Panel paddingVertical={30} />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default UsersRegister;
