import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupType from "../../libs/types/GroupType";
import utils from "../../libs/utils/utils";
import { setCurrentReduxGroup } from "../../reducers/actions/actionsCurrentSession";

const TAG = "useCurrentUser";
export function useCurrentGroup(): GroupType {
  const [group, setGroup] = useState<GroupType>(new GroupType("", null));

  useSelector((store: any) => {
    try {
      const newGroup = store.currentSession.group;
      if (!utils.objects.isEmpty(newGroup)) {
        if (group.id !== newGroup.id) {
          setGroup(new GroupType(newGroup.id, newGroup));
        }
        return new GroupType(newGroup.id, newGroup);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new GroupType("", null);
  });

  return group;
}

export function useSetCurrentGroup() {
  const dispatch = useDispatch();

  const callBack = useCallback((newGroup: GroupType) => {
    dispatch(setCurrentReduxGroup(newGroup));
  }, []);

  return callBack;
}
