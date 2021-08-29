import RoomMessageType from "../types/RoomMessageType";
import utils from "../utils/utils";
// eslint-disable-next-line object-curly-newline
import firestore, {
  FirebaseFirestoreTypes,
  // eslint-disable-next-line object-curly-newline
} from "@react-native-firebase/firestore";
import ApiStorage from "./apiStorage";

const TAG = "API ROOM";
class ApiRoom {
  apiStorage: ApiStorage;
  constructor() {
    this.apiStorage = new ApiStorage();
  }
  getRoomMessages(
    idRoom: string,
    setMessages: (data: Array<RoomMessageType>) => void,
    creationDateLimit?: number,
    intents = 0,
  ): any {
    const that = this;
    if (intents > 20) {
      setMessages([]);
      return () => null;
    }
    const groupColletion = firestore().collection("chat_rooms");

    function onResult(
      snap: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
    ) {
      const arr = Array<RoomMessageType>();
      console.log(TAG, "get messages");
      snap.forEach((doc) => {
        const msj = new RoomMessageType(doc.id, doc.data());
        if (!msj.isEmpty()) {
          arr.push(msj);
        }
      });
      setMessages(arr);
    }

    function onError(error: any) {
      console.error(TAG, "try again get room messages", error);
      if (`${error}`.includes("firestore/permission-denied")) {
        return;
      }
      that.getRoomMessages.call(that, idRoom, setMessages, intents);
    }
    const unSubs = creationDateLimit
      ? groupColletion
          .doc(idRoom)
          .collection("messages")
          .where("creationDate", "<", creationDateLimit)
          .orderBy("creationDate", "asc")
          .limitToLast(20)
          .onSnapshot(onResult, onError)
      : groupColletion
          .doc(idRoom)
          .collection("messages")
          .orderBy("creationDate", "asc")
          .limitToLast(20)
          .onSnapshot(onResult, onError);

    return unSubs;
  }
  uploadRoomMessage(
    roomID: string,
    msj: RoomMessageType,
    reject: () => void,
  ): void {
    const that = this;

    msj.creationDate = utils.dates.dateNowUnix();

    if (msj.isEmpty()) {
      console.error(TAG, "msj is empty");
      return;
    }
    if (!msj.exportToUpload()) {
      console.error(TAG, "Fail exportTo upload");
      return;
    }
    const roomsCollection = firestore().collection("chat_rooms");
    const newMessage = roomsCollection.doc(roomID).collection("messages").doc();

    const saveMessage = (messageData: RoomMessageType) => {
      const newData = messageData.exportToUpload();
      roomsCollection
        .doc(roomID)
        .collection("messages")
        .doc(newMessage.id)
        .set(newData)
        .then(() => {
          /** */
        })
        .catch((err) => {
          console.error(TAG, "saveMessage err", err);
          reject();
        });
    };
    const saveImage = () => {
      const filePath = `chat_rooms/${roomID}/messages/${newMessage.id}`;
      that.apiStorage.saveFile(
        filePath,
        msj.fileUrl!,
        (progress) => {
          /** */
        },
        (url) => {
          msj.setFileUpload(true);
          msj.setImage(url, msj.fileDimensions!);
          saveMessage(msj);
        },
        (err) => {
          console.error(TAG, "reject", err);
        },
      );
    };

    const saveAudio = () => {
      const filePath = `chat_rooms/${roomID}/messages/${newMessage.id}`;
      that.apiStorage.saveFile(
        filePath,
        msj.fileUrl!,
        (progress) => {
          /** */
        },
        (url) => {
          msj.setFileUpload(true);
          msj.setAudio(url, msj.fileSize!, msj.fileTime!);
          saveMessage(msj);
        },
        (err) => {
          console.error(TAG, "reject", err);
        },
      );
    };

    if (msj.type === "image") {
      saveImage();
      return;
    } else if (msj.type === "audio") {
      saveAudio();
      return;
    }
    saveMessage(msj);
  }
}
export default ApiRoom;
