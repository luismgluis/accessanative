import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Panel from "../../../ui/Panel/Panel";
import { Spinner, Text } from "@ui-kitten/components";
import CButton from "../../../ui/CButton/CButton";
import AppIcon from "../../../Icons/AppIcon/AppIcon";
import api from "../../../../libs/api/api";
import ThemeToggle from "../../../ui/ThemeToggle/ThemeToggle";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import useCustomBackHandler from "../../../hooks/useCustomBackHandler";
import CInput from "../../../ui/CInput/CInput";
import { useAbc } from "../../../hooks/useAbc";
import LanguageToggle from "../../../ui/LanguageToggle/LanguageToggle";

const styles = StyleSheet.create({
  spinner: { padding: 30 },
  input: { marginBottom: 30 },
  container: { paddingTop: 30 },
  warningText: { marginTop: 20 },
  icon: { marginBottom: 20 },
  createButton: { paddingTop: 0 },
  panelTheme: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
  },
  panelTitle: {
    alignItems: "center",
    height: 180,
  },
});

const TAG = "LOGIN";
type LoginProps = {};
const LoginScreen: React.FC<LoginProps> = (props) => {
  useFocusEffect(
    useCustomBackHandler(() => {
      return true;
    }),
  );
  const abc = useAbc().abc.login;

  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [warningInfo, setWarningInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const checkLogin = React.useCallback(() => {
    const alertWarning = () => {
      setLoading(false);
      setWarningInfo("Login failed");
      setTimeout(() => {
        setWarningInfo("");
      }, 2000);
    };
    setLoading(true);
    api
      .checkLoginByEmail(user, password)
      .then((result) => {
        if (result) {
          setLoading(false);
          navigation.navigate("Home");
          return;
        }
        alertWarning();
      })
      .catch(() => {
        alertWarning();
      });
  }, [navigation, password, user]);
  const goCreateAccount = () => {
    navigation.navigate("LoginCreateAccount");
  };

  return (
    <Panel
      level="1"
      verticalCenter={true}
      horizontalCenter={true}
      totalHeight={0}
      paddingHorizontal={50}>
      <View style={styles.container}>
        <View style={styles.panelTitle}>
          <AppIcon style={styles.icon} width={100} height={100} />
          <Text category="h4">Accessa</Text>
        </View>
        {!loading && (
          <>
            <View>
              <CInput
                style={styles.input}
                value={user}
                label={abc.user}
                placeholder="Example@email.com"
                textContentType="emailAddress"
                autoCompleteType="email"
                onChangeText={(nextValue) =>
                  setUser(nextValue.replace(" ", ""))
                }
              />
              <CInput
                style={styles.input}
                value={password}
                label={abc.password}
                typePassword={true}
                placeholder="*******"
                onChangeText={(nextValue) => setPassword(nextValue)}
              />
            </View>
            <Panel paddingHorizontal={35} paddingVertical={35}>
              <CButton
                paddingVertical={10}
                text={abc.login}
                onPress={checkLogin}
              />
              {warningInfo !== "" && (
                <Text style={styles.warningText} status="danger">
                  {warningInfo}
                </Text>
              )}
              {/* <CButton
                style={styles.createButton}
                appeareance="ghost"
                text={abc.createAccount}
                onPress={goCreateAccount}
              /> */}
            </Panel>
          </>
        )}
        {loading && (
          <Panel
            paddingVertical={50}
            horizontalCenter={true}
            style={styles.spinner}>
            <Spinner size="giant" />
          </Panel>
        )}
      </View>
      {!loading && (
        <View style={styles.panelTheme}>
          <LanguageToggle />
          <ThemeToggle />
        </View>
      )}
    </Panel>
  );
};
export default LoginScreen;
