import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import Panel from "../../ui/Panel/Panel";
import CTopBack from "../../ui/CTopBack/CTopBack";
import { useNavigation } from "@react-navigation/native";
import { useAbc } from "../../hooks/useAbc";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import CInput from "../../ui/CInput/CInput";
import PerfilAvatar from "../../ui/Perfil/PerfilAvatar/PerfilAvatar";
import { FeedImageType } from "../../ui/FeedImages/FeedImages";
import { CAlertInfo, CAlertLoading } from "../../ui/CAlert/CAlertNotification";
import UserType from "../../../libs/types/UserType";
import { useNavigatorGoTo } from "../../hooks/useNavigatorGoTo";
import { useEffect } from "react";
import CButton from "../../ui/CButton/CButton";
import api from "../../../libs/api/api";
import LanguageToggle from "../../ui/LanguageToggle/LanguageToggle";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";
import CText from "../../ui/CText/CText";
import { useLogOut } from "../../hooks/useLogOut";

const styles = StyleSheet.create({ container: {} });

const TAG = "PROFILE";
type ProfileScreenProps = {
  style?: StyleProp<ViewStyle>;
};
const ProfileScreen: React.FC<ProfileScreenProps> = ({ style }) => {
  const abc = useAbc().abc.Profile;
  const me = useCurrentUser();
  const goTo = useNavigatorGoTo();
  const [user, setUser] = useState(me);
  const logOut = useLogOut();

  useEffect(() => {
    setUser(me);
  }, [me]);

  const updateForm = (key: keyof UserType, value: any) => {
    const newData = user.exportToUpload();
    newData[key] = value;
    const newUser = new UserType(user.id, newData);
    setUser(newUser);
  };

  const onImageSelect = (data: FeedImageType) => {
    if (!data.imageFromCamera) {
      CAlertInfo(
        "Imagen Rechazada",
        "Aqui solo puedes ingresar fotografias tomadas en el momento",
      );
      return;
    }
    updateForm("profileImage", data.uri);
  };

  const updateMe = () => {
    console.log(TAG, user);
    const alert = CAlertLoading("Updating...");
    api.users
      .saveUser(user, me)
      .then(() => {
        alert.close();
        CAlertInfo(abc.infoUpdated, abc.loginAgain);
        logOut();
      })
      .catch(() => {
        alert.close();
        CAlertInfo(abc.infoUpdateFailed, "");
      });
  };
  console.log(TAG, me);
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack title={abc.profile} onBackPress={() => goTo.back()} />
      <Panel flex={12} level="5">
        <Panel paddingVertical={20} horizontalCenter={true}>
          <PerfilAvatar
            title={abc.image}
            imageUri={user.profileImage}
            changeButtonEnabled={true}
            onSelect={(data) => onImageSelect(data)}
          />
        </Panel>
        <Panel paddingHorizontal={20}>
          <CInput
            paddingVertical={15}
            label={abc.name}
            value={user.name}
            onChangeText={(t) => updateForm("name", t)}
          />
          <CInput
            paddingVertical={15}
            label={abc.email}
            value={user.email}
            onChangeText={(t) => updateForm("email", t)}
          />
          <CInput
            paddingVertical={15}
            label={abc.nickname}
            value={user.nickname}
            onChangeText={(t) => updateForm("nickname", t)}
          />
          <CButton
            paddingVertical={20}
            text={abc.update}
            onPress={() => updateMe()}></CButton>
        </Panel>

        <Panel
          level="6"
          paddingHorizontal={20}
          paddingVertical={10}
          flexDirection="row">
          <Panel flex={12} paddingHorizontal={10}>
            <CText category="h5">{abc.language}</CText>
          </Panel>
          <LanguageToggle />
        </Panel>

        <Panel
          level="6"
          paddingHorizontal={20}
          paddingVertical={10}
          flexDirection="row">
          <Panel flex={12} paddingHorizontal={10}>
            <CText category="h5">{abc.theme}</CText>
          </Panel>
          <ThemeToggle />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default ProfileScreen;
