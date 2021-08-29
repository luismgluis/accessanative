import GroupType from "../../libs/types/GroupType";
import UserType from "../../libs/types/UserType";

export const setCurrentReduxUser = (user: UserType) => (dispatch: any) => {
  dispatch({
    type: "setUser",
    payload: user,
  });
};

export const setCurrentReduxGroup = (group: GroupType) => (dispatch: any) => {
  dispatch({
    type: "setGroup",
    payload: group,
  });
};
