import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { ResidentType } from "../../libs/types/ResidentType";

const TAG = "useCurrentUser";
export function useNavigatorGoTo(callBack: (() => void) | null = null) {
  const navigation = useNavigation();

  const imageViewer = useCallback(
    (urlImage: string) => {
      const parms = { urlImage: urlImage };
      navigation.navigate("ImageViewer", parms);
      if (callBack) callBack();
    },
    [navigation],
  );
  const qrViewer = useCallback(
    (textValue: string, titleText: string = "") => {
      const parms = { value: textValue, title: titleText };
      navigation.navigate("QrViewer", parms);
      if (callBack) callBack();
    },
    [navigation],
  );
  const residentInfo = useCallback(
    (resident: ResidentType) => {
      const parms = { resident: resident };
      navigation.navigate("ResidentInfo", parms);
      if (callBack) callBack();
    },
    [navigation],
  );
  const residentHistory = useCallback(
    (resident: ResidentType) => {
      const parms = { resident: resident };
      navigation.navigate("ResidentHistory", parms);
      if (callBack) callBack();
    },
    [navigation],
  );
  const profile = useCallback(() => {
    navigation.navigate("Profile");
    if (callBack) callBack();
  }, []);
  const channels = useCallback(() => {
    navigation.navigate("Channels");
    if (callBack) callBack();
  }, []);
  const myGroups = useCallback(() => {
    navigation.navigate("MyGroups");
    if (callBack) callBack();
  }, []);
  const login = useCallback(() => {
    navigation.navigate("Login");
    if (callBack) callBack();
  }, []);
  const masiveMessage = useCallback(
    (
      title: string,
      masive: boolean,
      resident: ResidentType = new ResidentType("", null),
    ) => {
      const parms = { title: title, masive: masive, resident: resident };
      navigation.navigate("MasiveMsj", parms);
      if (callBack) callBack();
    },
    [],
  );
  const back = useCallback(() => {
    navigation.goBack();
  }, []);

  const res = useMemo(() => {
    return {
      imageViewer,
      qrViewer,
      residentInfo,
      residentHistory,
      profile,
      channels,
      myGroups,
      masiveMessage,
      login,
      back,
    };
  }, [imageViewer]);

  return res;
}
