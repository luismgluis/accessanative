import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Panel from "../../../ui/Panel/Panel";
import { Divider } from "@ui-kitten/components";
import CTopBack from "../../../ui/CTopBack/CTopBack";

import PerfilAvatar from "../../../ui/Perfil/PerfilAvatar/PerfilAvatar";
import { useFocusEffect } from "@react-navigation/core";
import useCustomBackHandler from "../../../hooks/useCustomBackHandler";
import CButton from "../../../ui/CButton/CButton";
import { FeedImageType } from "../../../ui/FeedImages/FeedImages";
import CInput from "../../../ui/CInput/CInput";

import api from "../../../../libs/api/api";
import utils from "../../../../libs/utils/utils";
import { useNavigation } from "@react-navigation/native";
import { CAlertInfo } from "../../../ui/CAlert/CAlertNotification";
import { useAbc } from "../../../hooks/useAbc";

const styles = StyleSheet.create({
  container: { padding: 50 },
  input: {},
  avatar: {
    width: 100,
    height: 100,
  },
  divider: { height: 10 },
});

const TAG = "LOGIN CREATE ACCOUNT";

const LoginCreateAccount: React.FC = (props) => {
  const dicc = useAbc().abc.loginCreate;
  const navigation = useNavigation();
  useFocusEffect(
    useCustomBackHandler(() => {
      navigation.goBack();
      return false;
    }),
  );
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [profileImage, setProfileImage] = useState({
    dimensions: "",
    uri: "",
  });
  const onSelectProfileImage = (data: FeedImageType) => {
    setProfileImage({
      uri: data.uri,
      dimensions: data.dimensions!,
    });
  };
  const validateForm = () => {
    if (
      form.password1 == form.password2 &&
      utils.validateEmail(form.email) &&
      form.name !== "" &&
      form.nickname !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const create = () => {
    console.log(TAG, "create");
    if (!validateForm()) {
      console.error(TAG, "reject form");
      CAlertInfo(dicc.invalidForm, dicc.tryAgain);
      return;
    }
    api
      .createUserWithEmail({
        ...form,
        profileImage: { ...profileImage },
      })
      .then(() => {
        navigation.navigate("Login");
        CAlertInfo(dicc.successCreate, dicc.successCreateMessge);
      })
      .catch((err) => {
        if (`${err}`.includes("auth/email-already-in-use")) {
          CAlertInfo(dicc.emailInUse, dicc.existAccountWithThisEmail);
          return;
        }
        CAlertInfo(dicc.invalidForm + ".err", dicc.tryAgain + err);
      });
  };
  const defaultInputProps = { style: styles.input, paddingVertical: 5 };
  return (
    <Panel level="1" totalHeight={0}>
      <CTopBack
        title="Create Account"
        onBackPress={() => navigation.goBack()}
      />
      <Panel
        withScroll={true}
        totalHeight={30}
        paddingHorizontal={50}
        verticalCenter={true}
        horizontalCenter={true}
        style={styles.container}>
        <PerfilAvatar
          imageUri={profileImage.uri}
          changeButtonEnabled={true}
          onSelect={onSelectProfileImage}
        />
        <CInput
          {...defaultInputProps}
          value={form.name}
          label={dicc.name}
          placeholder={dicc.placeHolderName}
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              name: nextValue,
            })
          }
        />
        <CInput
          {...defaultInputProps}
          value={form.nickname}
          label={dicc.nickName}
          textContentType="nickname"
          placeholder={dicc.placeHolderNickName}
          onChangeText={(nextValue) => {
            setForm({
              ...form,
              nickname: nextValue.replace(" ", ""),
            });
          }}
        />
        <Divider style={styles.divider} />
        <CInput
          {...defaultInputProps}
          value={form.email}
          label={dicc.email}
          textContentType="emailAddress"
          autoCompleteType="email"
          placeholder="example@mail.com"
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              email: nextValue.replace(" ", ""),
            })
          }
        />
        <CInput
          {...defaultInputProps}
          value={form.password1}
          label={dicc.password}
          typePassword
          placeholder="****"
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              password1: nextValue,
            })
          }
        />
        <CInput
          {...defaultInputProps}
          value={form.password2}
          label={dicc.repeatPassword}
          typePassword
          placeholder="****"
          onChangeText={(nextValue) =>
            setForm({
              ...form,
              password2: nextValue,
            })
          }
        />
        <Divider style={styles.divider} />
        <CButton paddingVertical={20} text={dicc.create} onPress={create} />
      </Panel>
    </Panel>
  );
};
export default LoginCreateAccount;
