import api from "../../../libs/api/api";
import RoomMessageType from "../../../libs/types/RoomMessageType";
import UserType from "../../../libs/types/UserType";

const TAG = "CHAT ROOM MODULE";
type updateMessagesFun = (msjs: Array<RoomMessageType>) => void;
export default class ChatRoomModule {
  idRoom: string;
  lastOldMessageLoaded: RoomMessageType;
  currentSetMessages: updateMessagesFun;
  currentArrMessages: Array<RoomMessageType>;
  currentObjMessages: any;
  constructor(id = "") {
    this.idRoom = id;
    this.lastOldMessageLoaded = new RoomMessageType("", {});
    this.currentArrMessages = [];
    this.currentObjMessages = {};
    this.currentSetMessages = () => null;
  }
  setRoomID(id: string): void {
    this.idRoom = id;
  }
  getMessages(setMessages: updateMessagesFun): () => void {
    const that = this;
    that.currentSetMessages = setMessages;
    return api.room.getRoomMessages(this.idRoom, (data) => {
      console.log(TAG, data);
      if (data == null) {
        setMessages(that.currentArrMessages);
        return;
      }
      if (data.length === 0) {
        setMessages(that.currentArrMessages);
        return;
      }
      let currentID = "";
      let currentElement: any = null;
      data.forEach((element) => {
        if (currentID !== element.creator) {
          element.firstMessage = true;
          if (currentElement !== null) {
            currentElement.lastMessage = true;
          }
        }
        currentID = element.creator;
        currentElement = element;
        if (typeof that.currentObjMessages[element.id] === "undefined") {
          that.currentObjMessages[element.id] = element;
          that.currentArrMessages.push(element);
        }
      });

      if (that.lastOldMessageLoaded.isEmpty()) {
        that.lastOldMessageLoaded = that.currentArrMessages[0];
      }
      setMessages(that.currentArrMessages);
    });
  }
  getOldsMessages(): Promise<boolean> {
    const that = this;
    const setMessages = that.currentSetMessages;
    return new Promise<boolean>((resolve, reject) => {
      if (that.lastOldMessageLoaded.isEmpty()) {
        reject(null);
        return;
      }
      const analice = (data: Array<RoomMessageType>) => {
        if (data == null) {
          setMessages(that.currentArrMessages);
          return;
        }
        let currentID = "";
        const newData = data.filter((element) => {
          if (currentID !== element.creator) {
            element.firstMessage = true;
          }
          currentID = element.creator;
          if (typeof that.currentObjMessages[element.id] !== "undefined") {
            return false;
          }
          return true;
        });

        that.currentArrMessages = newData.concat(that.currentArrMessages);
        that.lastOldMessageLoaded = that.currentArrMessages[0];

        setMessages(that.currentArrMessages);
        resolve(true);
        unSubs();
      };
      const unSubs = api.room.getRoomMessages(
        that.idRoom,
        analice,
        that.lastOldMessageLoaded.creationDate, //Creation date limit
      );
    });
  }
  saveMessage(msj: RoomMessageType): void {
    api.room.uploadRoomMessage(this.idRoom, msj, () => {
      console.error(TAG, "fail");
    });
  }
  getMessageCleanClone(msj: RoomMessageType): RoomMessageType {
    const clone = new RoomMessageType(
      "",
      Object.assign(
        {},
        {
          ...msj,
          text: "",
          type: "text",
        },
      ),
    );
    return clone;
  }
  getUserInfo(uid: string, callBack: (data: UserType) => void): void {
    api.users
      .getUserByID(uid)
      .then((data) => {
        callBack(data);
      })
      .catch(() => {
        callBack(new UserType("", null));
      });
  }
}
