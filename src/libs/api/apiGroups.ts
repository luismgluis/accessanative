import { ChannelType } from "../types/ChannelType";
import firestore from "@react-native-firebase/firestore";
import ApiUsers from "./apiUsers";
import GroupType from "../types/GroupType";
import utils from "../utils/utils";
import UserType from "../types/UserType";

const TAG = "API GROUPS";
class ApiGroup {
  currentGroup: string;
  currentGroupData: GroupType;
  apiUsers: ApiUsers;
  static instance: any;
  constructor() {
    this.apiUsers = new ApiUsers();
    this.currentGroup = "";
    this.currentGroupData = new GroupType("", null);
    if (typeof ApiGroup.instance === "object") {
      return ApiGroup.instance;
    }
    ApiGroup.instance = this;

    /* */
  }
  getGroupByID(id: string): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      try {
        const groupsCollection = firestore().collection("groups");
        groupsCollection
          .doc(id)
          .get()
          .then((res) => {
            const data: any = res.data();
            if (data !== null) {
              resolve(new GroupType(id, data));
              return;
            }
            reject(null);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }

  getUserGroups(uid = ""): Promise<Array<string>> {
    const that = this;
    if (uid === "") {
      uid = that.apiUsers.currentUser.id;
    }
    return new Promise<Array<string>>((resolve, reject) => {
      try {
        const userGroups = firestore()
          .collection("users")
          .doc(uid)
          .collection("groups");

        userGroups
          .get()
          .then((res) => {
            const arr: string[] = [];
            res.forEach((doc) => arr.push(doc.id));
            resolve(arr);
          })
          .catch(() => reject(null));
      } catch (error) {
        reject(null);
      }
    });
  }
  getChannelsList(uid = "", group = ""): Promise<Array<ChannelType>> {
    const that = this;
    console.log(TAG, "get channels");
    function getFromFirebase(
      idGroup: string | undefined,
      resolve: {
        (value: ChannelType[] | PromiseLike<ChannelType[]>): void;
        (value: ChannelType[] | PromiseLike<ChannelType[]>): void;
        (arg0: ChannelType[]): void;
      },
      reject: {
        (reason?: any): void;
        (reason?: any): void;
        (arg0: null): void;
      },
    ) {
      const channelsCollection = firestore().collection("groups");
      channelsCollection
        .doc(idGroup)
        .collection("channels")
        .get()
        .then((res) => {
          const arr = Array<ChannelType>();
          if (res !== null) {
            res.forEach((doc) => {
              arr.push(new ChannelType(doc.id, <any>doc.data()));
            });
            resolve(arr);
            return;
          }
          reject(null);
        })
        .catch((err) => {
          console.error(TAG, "fail to get groups", err);
          reject(err);
        });
    }
    return new Promise<Array<ChannelType>>((resolve, reject) => {
      try {
        if (group === "") {
          if (that.currentGroup === "") {
            that.getUserGroups(uid).then((channelsList) => {
              if (channelsList.length > 0) {
                that.currentGroup = channelsList[0];
                that
                  .getGroupByID(that.currentGroup)
                  .then((groupData) => {
                    that.currentGroupData = groupData;
                    getFromFirebase(that.currentGroup, resolve, reject);
                  })
                  .catch((err) => {
                    reject(err);
                  });
                return;
              }
              reject(null);
            });
            return;
          }
          group = that.currentGroup;
        }
        getFromFirebase(group, resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  searchGroupByAt(at: string): Promise<GroupType[]> {
    return new Promise<GroupType[]>((resolve, reject) => {
      try {
        const groupsCollection = firestore().collection("groups");
        groupsCollection
          .where("at", "==", at)
          .limit(1)
          .get()
          .then((res) => {
            const data: GroupType[] = [];
            if (res == null) {
              resolve(data);
              return;
            }
            res.forEach((doc) =>
              data.push(new GroupType(doc.id, <any>doc.data())),
            );
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  addChannelToMyGroup(
    me: UserType,
    idGroup: string,
    name: string,
  ): Promise<ChannelType> {
    console.log(TAG, "addcahnnel");
    const groupsChannelsCollection = firestore()
      .collection("groups")
      .doc(idGroup)
      .collection("channels");

    const groupsChatRoomsCollection = firestore().collection("chat_rooms");

    const newChatRoom = groupsChatRoomsCollection.doc();
    groupsChatRoomsCollection.doc(newChatRoom.id).set({ idGroup: idGroup });

    const newChannel = new ChannelType(newChatRoom.id, {
      id: newChatRoom.id,
      chatRoomID: newChatRoom.id,
      creationDate: utils.dates.dateNowUnix(),
      name: name,
      onlyAdmins: false,
      creator: me.id,
    });

    return new Promise<ChannelType>((resolve, reject) => {
      try {
        groupsChannelsCollection
          .add(newChannel.exportToUpload())
          .then(() => {
            console.log(TAG, "yes");
            resolve(newChannel);
          })
          .catch((err) => {
            console.log(TAG, "fail");
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  addGroupToMyGroups(
    me: UserType,
    idGroup: string,
    resolve: {
      (value: boolean | PromiseLike<boolean>): void;
      (res: any): void;
      (arg0: boolean): any;
    },
    reject: { (reason?: any): void; (err: any): void; (arg0: any): any },
  ): void {
    const groupsDoc = firestore()
      .collection("users")
      .doc(me.id)
      .collection("groups")
      .doc(idGroup);
    const newField = { creationDate: utils.dates.dateNowUnix() };

    groupsDoc
      .set(newField)
      .then(() => resolve(true))
      .catch((err) => reject(err));
  }
  addMeToGroupUsers(me: UserType, idGroup: string): Promise<void> {
    const groupsCollection = firestore()
      .collection("groups")
      .doc(idGroup)
      .collection("members");
    const newField = { creationDate: utils.dates.dateNowUnix() };
    return groupsCollection.doc(me.id).set(newField);
  }
  addAdminToMyGroup(idGroup: string, idUser: string): Promise<any> {
    const groupDoc = firestore().collection("groups").doc(idGroup);
    return groupDoc.collection("admins").doc(idUser).set({
      uid: idUser,
      creationDate: utils.dates.dateNowUnix(),
    });
  }
  joinGroup(idGroup: string): Promise<boolean> {
    const that = this;
    const me = that.apiUsers.currentUser;

    return new Promise<boolean>((resolve, reject) => {
      try {
        console.log(TAG, "joinGroup", idGroup);
        that
          .getGroupByID(idGroup)
          .then((group) => {
            console.log(TAG, group);
            if (!group.isEmpty()) {
              that
                .addMeToGroupUsers(me, idGroup)
                .then(() =>
                  that.addGroupToMyGroups(me, idGroup, resolve, reject),
                )
                .catch((err) => {
                  console.log(TAG, "fail to join group", err);
                  reject(err);
                });
              return;
            }
            reject(null);
          })
          .catch(() => reject(null));
      } catch (error) {
        reject(null);
      }
    });
  }
  createGroup(group: GroupType, me: UserType): Promise<GroupType> {
    const that = this;

    const addNewGroup = (
      groupInfo: GroupType,
      resolve: {
        (value: GroupType | PromiseLike<GroupType>): void;
        (arg0: GroupType): void;
      },
      reject: { (reason?: any): void; (arg0: null): void },
    ) => {
      groupInfo.at = groupInfo.at.replace(" ", "").toLowerCase();
      const groupsCollection = firestore().collection("groups");
      const newGroup = groupsCollection.doc();
      const completeCreation = async () => {
        const res = {
          a1: false,
          a2: false,
          a3: false,
        };
        res.a1 = await that
          .addAdminToMyGroup(newGroup.id, me.id)
          .then(() => true)
          .catch((err) => {
            console.log(TAG, "addAdminToMyGroup", err);
            return false;
          });
        res.a2 = await that
          .addMeToGroupUsers(me, newGroup.id)
          .then(() => true)
          .catch((err) => {
            console.log(TAG, "addMeToGroupUsers", err);
            return false;
          });
        res.a3 = await that
          .addChannelToMyGroup(me, newGroup.id, "General")
          .then(() => true)
          .catch((err) => {
            console.log(TAG, "addChannelToMyGroup", err);
            return false;
          });

        console.log(TAG, res);
        that.addGroupToMyGroups(
          me,
          newGroup.id,
          (res: any) => {
            if (res) {
              groupInfo.id = newGroup.id;
              resolve(groupInfo);
              return;
            }
            reject(null);
          },
          (err: any) => {
            console.log(TAG, err);
            reject(err);
          },
        );
      };
      groupsCollection
        .doc(newGroup.id)
        .set(groupInfo.exportToUpload())
        .then(() => completeCreation())
        .catch((err) => reject(err));
    };
    return new Promise<GroupType>((resolve, reject) => {
      try {
        const newGroup = new GroupType("", {
          ...group.exportToUpload(),
          creationDate: utils.dates.dateNowUnix(),
          creator: me.id,
          id: "",
        });
        if (newGroup.name === "" || newGroup.at === "") {
          reject(null);
          return;
        }
        console.log(TAG, "addnewgroup");
        addNewGroup(newGroup, resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
}
export default ApiGroup;
