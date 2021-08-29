import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../libs/api/api";
import UserType from "../../../libs/types/UserType";
import { setCurrentReduxGroup } from "../../../reducers/actions/actionsCurrentSession";
import {
  useCurrentGroup,
  useSetCurrentGroup,
} from "../../hooks/useCurrentGroup";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { CAlertInfo } from "../../ui/CAlert/CAlertNotification";
import { ChannelsListItem, HomeModule } from "./HomeModule";

const TAG = "HOME NEEDS";
export type HomeNeedsStateChanged = "loadGroup" | "loadChannels" | "joinGroup";
type HomeNeedsProps = {
  onStateChange: (data: HomeNeedsStateChanged) => void;
  onChannelsListChanges: (data: ChannelsListItem[]) => void;
};
const HomeNeeds: React.FC<HomeNeedsProps> = ({
  onStateChange,
  onChannelsListChanges,
}) => {
  const user = useCurrentUser();
  const group = useCurrentGroup();
  const dispatch = useDispatch();
  const setCurrentGroup = useSetCurrentGroup();
  const { alertJoinToGroup } = HomeModule();

  useEffect(() => {
    if (user.isEmpty()) return;
    if (group.isEmpty()) return;
    onStateChange("loadChannels");
    getChannels(user, (data) => {
      if (data === null) {
        CAlertInfo("Fail", "get channels");
        return;
      }
      onChannelsListChanges(data);
    });
  }, [user, group, setCurrentGroup]);

  const getChannels = (
    me: UserType,
    callBack: (data: Array<ChannelsListItem> | null) => void,
  ): void => {
    api.group
      .getChannelsList(me.id)
      .then((data) => {
        if (data == null) {
          callBack(null);
          return;
        }

        let index = -1;
        const newData: Array<ChannelsListItem> = [];
        newData.push({
          index: ++index,
          key: "{ACCESS-MODULE}",
          withIcon: true,
          module: "access",
        });
        newData.push({
          index: ++index,
          key: "{HISTORY-MODULE}",
          withIcon: true,
          module: "history",
        });
        newData.push({
          index: ++index,
          key: "{REGISTER-MODULE}",
          withIcon: true,
          module: "register",
        });

        const newMapData: Array<ChannelsListItem> = data.map((channel) => ({
          index: ++index,
          key: channel.chatRoomID,
          withIcon: false,
          channel: channel,
          module: "channel",
        }));
        console.log(TAG, newData);
        newData.push(...newMapData);
        callBack(newData);
      })
      .catch((err) => {
        console.log(TAG, err);
        callBack(null);
      });
  };

  useEffect(() => {
    if (user.isEmpty()) return;
    if (!group.isEmpty()) return;

    const failGroup = () => {
      onStateChange("joinGroup");
      alertJoinToGroup((newGroup: any) => {
        console.log(TAG, "data", newGroup);
        if (newGroup !== null) {
          setCurrentGroup(newGroup);
        }
      });
    };
    const saveGroupRedux = (groups: string[]) => {
      api.group
        .getGroupByID(groups[0])
        .then((groupInfo) => {
          console.log(TAG, groupInfo);
          if (!groupInfo.isEmpty()) {
            setCurrentGroup(groupInfo);
            return;
          }
          failGroup();
        })
        .catch(() => {
          failGroup();
        });
    };

    onStateChange("loadGroup");
    api.group
      .getUserGroups(user.id)
      .then((groups) => {
        if (groups.length === 0) {
          failGroup();
          return;
        }
        saveGroupRedux(groups);
      })
      .catch((err) => {
        console.log(TAG, err);
        failGroup();
      });
  }, [user, group, dispatch, module]);

  return <></>;
};
export default HomeNeeds;
