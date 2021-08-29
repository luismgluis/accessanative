import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../../../libs/api/api";
import { setCurrentReduxGroup } from "../../../reducers/actions/actionsCurrentSession";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useCustomBackHandler from "../../hooks/useCustomBackHandler";
import { useTheme } from "../../hooks/useTheme";
import TeamIcon from "../../Icons/others/TeamIcon";
import {
  CAlertEmpty,
  CAlertQuestion,
  CAlertType,
} from "../../ui/CAlert/CAlertNotification";
import JoinGroup from "../../ui/Group/JoinGroup";
import utils from "../../../libs/utils/utils";
import GroupType from "../../../libs/types/GroupType";
import DoneDealIcon from "./../../Icons/others/DoneDealIcon";
import CreateGroup from "../../ui/Group/CreateGroup";
import { ChannelType } from "../../../libs/types/ChannelType";
import UserType from "../../../libs/types/UserType";
const TAG = "HOME MODULE";

export type ChannelsListItem = {
  key: string;
  index: number;
  withIcon: boolean;
  module: "access" | "history" | "register" | "channel";
  channel?: ChannelType;
};

function module() {
  const user = useCurrentUser();
  const group = useCurrentGroup();
  const theme = useTheme();
  const [currentAlert, setCurrentAlert] = useState<CAlertType>({
    show: () => null,
    close: () => null,
  });

  const alertJoinToGroup = (callBack: (data: GroupType) => void): void => {
    const alertIcon = (
      <TeamIcon
        width={150}
        height={150}
        color={theme.colors["color-primary-500"]}
      />
    );
    const alert = CAlertQuestion(
      "Hello",
      "it seems that you still do not belong to a group",
      alertIcon,
      {
        text: "Join a group",
        onPress: () => onPressJoin(),
      },
      {
        text: "Create group",
        onPress: () => onPressCreate(),
      },
      {
        text: "Back to login",
        onPress: () => {
          api.logOut();
          alert.close();
        },
      },
      undefined,
      false,
    );
    setCurrentAlert(alert);
    const onPressCreate = () => {
      createGroup((data) => {
        if (data == null) {
          alert.show();
          return;
        }
        alert.close();
        callBack(data);
      });
    };
    const onPressJoin = () => {
      joinGroup((data) => {
        console.log(TAG, data);
        if (data == null) {
          alert.show();
          return;
        }
        confirmJoinToGroup(data, (res) => {
          console.log(TAG, res);
          if (res) callBack(data);
          if (!res) {
            alert.show();
            setCurrentAlert(alert);
          }
        });
      });
    };
  };
  const alertChangeGroup = (
    callBack: (data: GroupType | null) => void,
  ): void => {
    const iconAlert = (
      <TeamIcon
        width={150}
        height={150}
        color={theme.colors["color-primary-500"]}
      />
    );
    const alert = CAlertQuestion(
      "Hello",
      "Do you want to change group?",
      iconAlert,
      {
        text: "Join a group",
        onPress: () => onPressJoin(),
      },
      {
        text: "Create group",
        onPress: () =>
          createGroup((data) => {
            alert.close();
            callBack(data);
          }),
      },
      {
        text: "Back to login",
        onPress: () => {
          api.logOut();
          alert.close();
        },
      },
      () => alert.close(),
      true,
    );
    setCurrentAlert(alert);
    const onPressJoin = () => {
      joinGroup((data) => {
        if (data == null) {
          callBack(null);
          return;
        }
        confirmJoinToGroup(data, (res) => {
          console.log(TAG, res);
          if (res) callBack(data);
          if (!res) {
            alert.show();
            setCurrentAlert(alert);
          }
        });
      });
    };
  };
  const confirmJoinToGroup = (
    group: GroupType,
    callBack: (result: boolean) => void,
  ): void => {
    const alert = CAlertQuestion(
      `Are sure to join to ${group.name}`,
      `Created at: ${utils.dates.unixToString(group.creationDate)}`,
      <DoneDealIcon
        width={150}
        height={150}
        color={theme.colors["color-primary-500"]}
        colorTwo={theme.colors["color-primary-300"]}
      />,
      {
        text: "Join",
        onPress: () => {
          api.group
            .joinGroup(group.id)
            .then((res) => {
              alert.close();
              if (res) callBack(true);
              if (!res) callBack(false);
            })
            .catch(() => {
              alert.close();
              callBack(false);
            });
        },
      },
      {
        text: "Cancel",
        onPress: () => callBack(false),
      },
    );
    setCurrentAlert(alert);
  };
  const joinGroup = (callBack: (data: GroupType | null) => void): void => {
    const alert = CAlertEmpty(
      <>
        <JoinGroup callBack={callBack} />
      </>,
    );
    setCurrentAlert(alert);
  };
  const createGroup = (callBack: (data: GroupType | null) => void): void => {
    const alert = CAlertEmpty(
      <>
        <CreateGroup callBack={callBack} />
      </>,
    );
    setCurrentAlert(alert);
  };

  const closeCurrentAlert = (): void => {
    currentAlert?.close();
  };

  // const getChannels = (
  //   me: UserType,
  //   callBack: (data: Array<ChannelsListItem> | null) => void,
  // ): void => {
  //   api.group
  //     .getChannelsList(me.id)
  //     .then((data) => {

  //       if (data == null) {
  //         callBack(null);
  //         return;
  //       }

  //       let index = -1;
  //       const newData: Array<ChannelsListItem> = [];
  //       newData.push({
  //         index: ++index,
  //         key: "{ACCESS-MODULE}",
  //         withIcon: true,
  //         module: "access",
  //       });
  //       newData.push({
  //         index: ++index,
  //         key: "{HISTORY-MODULE}",
  //         withIcon: true,
  //         module: "history",
  //       });
  //       newData.push({
  //         index: ++index,
  //         key: "{REGISTER-MODULE}",
  //         withIcon: true,
  //         module: "register",
  //       });

  //       const newMapData: Array<ChannelsListItem> = data.map((channel) => ({
  //         index: ++index,
  //         key: channel.chatRoomID,
  //         withIcon: false,
  //         channel: channel,
  //         module: "channel",
  //       }));
  //       console.log(TAG, newData);
  //       newData.push(...newMapData);
  //       callBack(newData);
  //     })
  //     .catch((err) => {
  //       console.log(TAG, err);
  //       callBack(null);
  //     });
  // };
  return {
    user,
    group,
    theme,
    alertJoinToGroup,
    alertChangeGroup,
    confirmJoinToGroup,
    joinGroup,
    createGroup,
    // getChannels,
    closeCurrentAlert,
  };
}

export const HomeModule = module;
