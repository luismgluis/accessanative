export const ss = 22;
// import { GroupType } from "@react-native-community/cameraroll";
// import React from "react";
// import api from "../../../../libs/api/api";
// import { ChannelType } from "../../../../libs/types/ChannelType";
// import TeamIcon from "../../../Icons/others/TeamIcon";
// import { CAlertEmpty, CAlertQuestion } from "../../ui/CAlert/CAlertNotification";
// import CreateGroup from "../../ui/Group/CreateGroup";
// import JoinGroup from "../../ui/Group/JoinGroup";

// const TAG = "HOME MODULE";

// export type ChannelsListItem = {
//   key: string;
//   index: number;
//   withIcon: boolean;
//   module: "access" | "history" | "register" | "channel";
//   channel?: ChannelType;
// };

// export default class HomeModule {
//   theme: Array<any>;
//   currentAlert: any;
//   constructor(theme) {
//     this.theme = theme;
//     this.currentAlert = null;
//   }
//   alertJoinToGroup(callBack: (data: GroupType) => void): void {
//     const that = this;
//     const alertIcon = (
//       <TeamIcon
//         width={150}
//         height={150}
//         color={that.theme.colors["color-primary-500"]}
//       />
//     );
//     const alert = CAlertQuestion(
//       "Hello",
//       "it seems that you still do not belong to a group",
//       alertIcon,
//       {
//         text: "Join a group",
//         onPress: () => onPressJoin(),
//       },
//       {
//         text: "Create group",
//         onPress: () => onPressCreate(),
//       },
//       {
//         text: "Back to login",
//         onPress: () => {
//           api.logOut();
//           alert.close();
//         },
//       },
//       null,
//       false,
//     );
//     that.currentAlert = alert;
//     const onPressCreate = () => {
//       that.createGroup((data) => {
//         if (data == null) {
//           alert.show();
//           return;
//         }
//         alert.close();
//         callBack(data);
//       });
//     };
//     const onPressJoin = () => {
//       that.joinGroup((data) => {
//         console.log(TAG, data);
//         if (data == null) {
//           alert.show();
//           return;
//         }
//         that.confirmJoinToGroup(data, (res) => {
//           console.log(TAG, res);
//           if (res) callBack(data);
//           if (!res) {
//             alert.show();
//             that.currentAlert = alert;
//           }
//         });
//       });
//     };
//   }
//   alertChangeGroup(callBack: (data: GroupType) => void): void {
//     const that = this;
//     const iconAlert = (
//       <TeamIcon
//         width={150}
//         height={150}
//         color={that.theme.colors["color-primary-500"]}
//       />
//     );
//     const alert = CAlertQuestion(
//       "Hello",
//       "Do you want to change group?",
//       iconAlert,
//       {
//         text: "Join a group",
//         onPress: () => onPressJoin(),
//       },
//       {
//         text: "Create group",
//         onPress: () =>
//           that.createGroup((data) => {
//             alert.close();
//             callBack(data);
//           }),
//       },
//       {
//         text: "Back to login",
//         onPress: () => {
//           api.logOut();
//           alert.close();
//         },
//       },
//       () => alert.close(),
//       true,
//     );
//     that.currentAlert = alert;
//     const onPressJoin = () => {
//       that.joinGroup((data) => {
//         if (data == null) {
//           callBack(null);
//           return;
//         }
//         that.confirmJoinToGroup(data, (res) => {
//           console.log(TAG, res);
//           if (res) callBack(data);
//           if (!res) {
//             alert.show();
//             that.currentAlert = alert;
//           }
//         });
//       });
//     };
//   }
//   confirmJoinToGroup(
//     group: GroupType,
//     callBack: (result: boolean) => void,
//   ): void {
//     const that = this;
//     const alert = CAlertQuestion(
//       `Are sure to join to ${group.name}`,
//       `Created at: ${utils.dates.unixToString(group.creationDate)}`,
//       <DoneDealIcon
//         width={150}
//         height={150}
//         color={that.theme.colors["color-primary-500"]}
//         colorTwo={that.theme.colors["color-primary-300"]}
//       />,
//       {
//         text: "Join",
//         onPress: () => {
//           api.group
//             .joinGroup(group.id)
//             .then((res) => {
//               if (res) callBack(true);
//               if (!res) callBack(false);
//             })
//             .catch(() => callBack(false));
//         },
//       },
//       {
//         text: "Cancel",
//         onPress: () => callBack(false),
//       },
//     );
//     that.currentAlert = alert;
//   }
//   joinGroup(callBack: (data: GroupType) => void): void {
//     const that = this;
//     const alert = CAlertEmpty(
//       <>
//         <JoinGroup callBack={callBack} />
//       </>,
//     );
//     that.currentAlert = alert;
//   }
//   createGroup(callBack: (data: GroupType) => void): void {
//     const that = this;
//     const alert = CAlertEmpty(
//       <>
//         <CreateGroup callBack={callBack} />
//       </>,
//     );
//     that.currentAlert = alert;
//   }

//   closeCurrentAlert(): void {
//     this.currentAlert?.close();
//   }
// }

// export const getChannels = (
//   callBack: (data: Array<ChannelsListItem>) => void,
// ): void => {
//   api.group
//     .getChannelsList()
//     .then((data) => {
//       if (data == null) {
//         callBack([]);
//         //onChange(null);
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
//       console.error(TAG, err);
//       callBack([]);
//     });
// };
