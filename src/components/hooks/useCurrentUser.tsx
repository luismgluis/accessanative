import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import utils from "../../libs/utils/utils";
import UserType from "../../libs/types/UserType";
import { setCurrentReduxUser } from "../../reducers/actions/actionsCurrentSession";
import { useCallback } from "react";

const TAG = "useCurrentUser";
export function useCurrentUser(): UserType {
  //console.log(TAG, "use call");
  const [user, setUser] = useState<UserType>(new UserType("", null));

  useSelector((store: any) => {
    try {
      const newUser = store.currentSession.user;
      if (!utils.objects.isEmpty(newUser)) {
        if (user.id !== newUser.id) {
          setUser(new UserType(newUser.id, newUser));
        }
        return new UserType(newUser.id, newUser);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new UserType("", null);
  });

  return user;
}

export function userSetCurrentUser() {
  const dispatch = useDispatch();

  const callBack = useCallback((newUser: UserType) => {
    dispatch(setCurrentReduxUser(newUser));
  }, []);
  return callBack;
}
