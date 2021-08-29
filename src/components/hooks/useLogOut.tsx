import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback } from "react";
import api from "../../libs/api/api";
import GroupType from "../../libs/types/GroupType";
import UserType from "../../libs/types/UserType";
import { CAlertInfo } from "../ui/CAlert/CAlertNotification";
import { useAbc } from "./useAbc";
import { useCurrentGroup, useSetCurrentGroup } from "./useCurrentGroup";
import { userSetCurrentUser } from "./useCurrentUser";
import { useNavigatorGoTo } from "./useNavigatorGoTo";

export function useLogOut() {
  const abc = useAbc().abc.HomeTopBar;
  const setGroup = useSetCurrentGroup();
  const setMe = userSetCurrentUser();
  const goTo = useNavigatorGoTo();

  const fun = useCallback(() => {
    api
      .logOut()
      .then(() => {
        setMe(new UserType("", null));
        setGroup(new GroupType("", null));
        AsyncStorage.clear();
        goTo.login();
      })
      .catch(() => {
        CAlertInfo(abc.failLogOut, abc.tryAgain);
      });
  }, [goTo]);

  return fun;
}
