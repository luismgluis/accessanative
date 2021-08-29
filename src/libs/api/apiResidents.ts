import { ResidentType } from "../types/ResidentType";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import ApiGroup from "./apiGroups";
import { ResidentAccess } from "./../types/ResidentType";
import ApiStorage from "./apiStorage";
import utils from "../utils/utils";
import axios from "axios";
import { TelegramUsersReplies } from "../types/TelegramUsers";
import GroupType from "../types/GroupType";
import { VehicleType } from "../types/VehicleType";

const TAG = "API RESIDENTS";

export type telegramMessage = {
  creationDate: number;
  message: string;
};

export type callBackStop = {
  setCallBack: (callBack: (result: TelegramUsersReplies) => void) => void;
  stopListener: () => void;
};

type residentPendingData = {
  valueSearch: string;
  callBack: (res: ResidentType[]) => void;
};

export class ApiResidents {
  group: ApiGroup;
  storage: ApiStorage;
  private arrResidents: any;
  private arrPendingData: residentPendingData[];
  constructor() {
    this.storage = new ApiStorage();
    this.group = new ApiGroup();
    this.arrResidents = {};
    this.arrPendingData = [];
    //
  }
  getTelegram(resi: ResidentType): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        firestore()
          .collection("telegram_users")
          .where("sector", "==", resi.sector)
          .where("idCard", "==", resi.idCard)
          .limit(1)
          .get()
          .then((data) => {
            console.log(TAG, data);
            const arrData: any = [];
            data.forEach((doc) => {
              console.log(TAG, doc.data());
              const telegramInfo = {
                ...doc.data(),
                id: doc.id,
              };
              arrData.push(telegramInfo);
            });
            if (arrData.length > 0) {
              resolve(arrData[0]);
              return;
            }
            reject(null);
          })
          .catch((err) => {
            console.log(TAG, err);
            reject(null);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  sendTelegramMessage(
    resi: ResidentType,
    msj: string,
    replyOptions: Array<string>,
    withReply: boolean = true,
  ): Promise<callBackStop | null> {
    const that = this;
    let telegramInfo = <any>{};
    const arrReplyOptions = replyOptions
      .map((item) => item.replace("|", ","))
      .join("|");

    const fireColletion = firestore().collection("telegram_users_replies");

    const goodReply = () => {
      let customCallBack = (reply: TelegramUsersReplies | null) => null;
      const onResult = (result: any) => {
        const data = result.data();
        customCallBack(data);
      };
      const onError = () => {
        customCallBack(null);
      };
      console.log(TAG, "telegraminfo", telegramInfo);
      const listener = fireColletion
        .doc(telegramInfo.id)
        .onSnapshot(onResult, onError);

      return {
        setCallBack: (callBackfun: any) => {
          customCallBack = callBackfun;
        },
        stopListener: () => {
          listener();
          //
        },
      };
    };
    const sendMsj = (
      resolve: (res: callBackStop | null) => void,
      reject: any,
    ) => {
      fireColletion.doc(telegramInfo.id).update({ reply: "" });
      axios
        .post(
          "https://us-east1-accessatelegrambot1.cloudfunctions.net/sendBotMessage",
          {
            message: msj,
            idTelegramUser: telegramInfo.id,
            pendingResponse: "true",
            replyOptions: arrReplyOptions,
          },
          {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            responseType: "json",
          },
        )
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            if (data.result === "OK") {
              if (withReply) {
                resolve(goodReply());
                return;
              }
              resolve(null);
            }
          }
          reject(null);
        })
        .catch((err) => {
          console.log(TAG, " reject ", err);
          reject(null);
        });
    };

    return new Promise<callBackStop | null>(async (resolve, reject) => {
      try {
        const idTelegramUser = await that.getTelegram(resi).catch(() => null);
        if (idTelegramUser) {
          telegramInfo = idTelegramUser;
          sendMsj(resolve, reject);
          return;
        }
        reject(null);
      } catch (error) {
        reject(null);
      }
    });
  }
  saveResident(resi: ResidentType): Promise<string> {
    //
    const that = this;
    const currentGroup = that.group.currentGroup;

    return new Promise<string>((resolve, reject) => {
      try {
        const profileImageUri = resi.profileImage;
        const idCardImageUri = resi.idCardImage;
        resi.profileImage = "";
        resi.idCardImage = "";

        const newResiRef = firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("residents")
          .doc();
        const saveImage = (idResident = "") => {
          that.storage.saveFile(
            `/group/${currentGroup}/residents/${idResident}/profileImage`,
            profileImageUri,
            (p) => {
              console.log(TAG, "progress upload profileImage", p);
            },
            (uri) => {
              newResiRef.update({ profileImage: uri });
              saveImageIdCard(idResident);
            },
          );
        };
        const saveImageIdCard = (idResident = "") => {
          if (!idCardImageUri) return;
          that.storage.saveFile(
            `/group/${currentGroup}/residents/${idResident}/idCardImage`,
            idCardImageUri,
            (p) => {
              console.log(TAG, "progress upload idCardImage", p);
            },
            (uri) => {
              newResiRef.update({ idCardImage: uri });
            },
          );
        };
        newResiRef
          .set(resi.exportToUpload())
          .then(() => {
            resolve(newResiRef.id);
            saveImage(newResiRef.id);
          })
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }
  updateResident(
    originalResident: ResidentType,
    resiUpdated: ResidentType,
  ): Promise<ResidentType> {
    const that = this;
    const currentGroup = that.group.currentGroup;
    return new Promise<ResidentType>((resolve, reject) => {
      try {
        console.log(TAG, "uodateddd");
        const residentResult = new ResidentType("", null);
        residentResult.cloneFrom(resiUpdated);

        const profileImageUri =
          originalResident.profileImage !== resiUpdated.profileImage
            ? resiUpdated.profileImage
            : "";
        const idCardImageUri =
          originalResident.idCardImage !== resiUpdated.idCardImage
            ? resiUpdated.idCardImage
            : "";

        resiUpdated.profileImage =
          originalResident.profileImage === resiUpdated.profileImage
            ? resiUpdated.profileImage
            : "";

        resiUpdated.idCardImage =
          originalResident.idCardImage === resiUpdated.idCardImage
            ? resiUpdated.idCardImage
            : "";

        const newResiRef = firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("residents")
          .doc(resiUpdated.id);

        const saveImage = (idResident = "", callBack: () => void) => {
          if (profileImageUri === "") {
            callBack();
            return;
          }
          that.storage.saveFile(
            `/group/${currentGroup}/residents/${idResident}/profileImage`,
            profileImageUri,
            (p) => {
              console.log(TAG, "progress upload profileImage", p);
            },
            (uri) => {
              newResiRef.update({ profileImage: uri });
              residentResult.profileImage = uri;
              callBack();
            },
            (err) => {
              console.log(TAG, "ERR TO UPLOAD IMAGE");
              callBack();
            },
          );
        };
        const saveImageIdCard = (idResident = "", callBack: () => void) => {
          if (!idCardImageUri || idCardImageUri === "") {
            callBack();
            return;
          }
          that.storage.saveFile(
            `/group/${currentGroup}/residents/${idResident}/idCardImage`,
            idCardImageUri,
            (p) => {
              console.log(TAG, "progress upload idCardImage", p);
            },
            (uri) => {
              newResiRef.update({ idCardImage: uri });
              residentResult.idCardImage = uri;
              callBack();
            },
            (err) => {
              console.log(TAG, "ERR TO UPLOAD IMAGE ID CARD");
              callBack();
            },
          );
        };

        newResiRef
          .update(resiUpdated.exportToUpload())
          .then(() => {
            saveImage(newResiRef.id, () => {
              saveImageIdCard(newResiRef.id, () => {
                resolve(residentResult);
              });
            });
          })
          .catch((err) => {
            console.log(TAG, err);
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  searchResident(
    type: "idCard" | "sector" | "id" | "vehicle",
    value = "",
    localData = false,
  ): Promise<Array<ResidentType>> {
    const that = this;
    const currentGroup = that.group.currentGroup;
    console.log(TAG, type, value, currentGroup);
    return new Promise<Array<ResidentType>>((resolve, reject) => {
      try {
        if (type === "id") {
          if (localData) {
            if (typeof that.arrResidents[value] !== "undefined") {
              resolve([that.arrResidents[value]]);
              return;
            }
          }
          const pendings = that.arrPendingData.filter(
            (res) => res.valueSearch === value,
          );
          if (pendings.length > 0) {
            that.arrPendingData.push({
              valueSearch: value,
              callBack: (res) => {
                resolve(res);
              },
            });
            return;
          }
          that.arrPendingData.push({
            valueSearch: value,
            callBack: (res) => {
              return null;
            },
          });
          firestore()
            .collection("groups")
            .doc(currentGroup)
            .collection("residents")
            .doc(value)
            .get()
            .then((doc) => {
              const data: any = doc.data();
              const update = (residentResult: ResidentType[]) => {
                const pendings = that.arrPendingData.filter(
                  (res) => res.valueSearch === value,
                );
                pendings.forEach((item) => item.callBack(residentResult));

                that.arrPendingData = that.arrPendingData.filter(
                  (res) => res.valueSearch !== value,
                );
              };

              if (typeof data !== "undefined" && data !== null) {
                if (typeof data.name !== "undefined") {
                  console.log(TAG, data);
                  const ress = new ResidentType(doc.id, data);
                  that.arrResidents[value] = ress;
                  resolve([ress]);
                  update([ress]);
                  return;
                }
              }
              resolve([]);
              update([]);
            })
            .catch((err) => {
              reject(err);
            });
          return;
        }
        if (type === "vehicle") {
          firestore()
            .collection("groups")
            .doc(currentGroup)
            .collection("vehicles")
            .where("licensePlate", "==", value.replace(" ", ""))
            .get()
            .then((snap) => {
              if (snap.empty) {
                resolve([]);
                return;
              }
              const data: VehicleType[] = [];
              snap.forEach((doc) => {
                data.push(new VehicleType(doc.id, <any>doc.data()));
              });
              if (data.length > 0) {
                that
                  .searchResident("id", data[0].idResident)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
                return;
              }
              resolve([]);
            })
            .catch((err) => {
              reject(err);
            });
          return;
        }
        firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("residents")
          .where(type, "==", value)
          .get()
          .then((data) => {
            const result: Array<ResidentType> = [];
            data.forEach((doc) => {
              result.push(new ResidentType(doc.id, <any>doc.data()));
            });
            console.log(TAG, result);
            if (result.length > 0) {
              resolve(result);
              return;
            }
            resolve([]);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  getAllResidents(): Promise<Array<ResidentType>> {
    const that = this;
    const currentGroup = that.group.currentGroup;
    return new Promise<Array<ResidentType>>((resolve, reject) => {
      try {
        firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("residents")
          .get()
          .then((res) => {
            const arr: ResidentType[] = [];
            if (res.empty) {
              resolve(arr);
              return;
            }
            res.forEach((doc) =>
              arr.push(new ResidentType(doc.id, <any>doc.data())),
            );
            resolve(arr);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  getLastAccess(
    resident: ResidentType,
    limit = 1,
  ): Promise<Array<ResidentAccess>> {
    const that = this;
    const currentGroup = that.group.currentGroup;
    return new Promise<Array<ResidentAccess>>((resolve, reject) => {
      try {
        firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("access")
          .where("idResident", "==", resident.id)
          .limit(limit) //max 30
          .get()
          .then((data) => {
            const result: Array<ResidentAccess> = [];
            data.forEach((doc) => {
              result.push(new ResidentAccess(doc.id, <any>doc.data()));
            });
            if (result.length > 0) {
              resolve(result);
              return;
            }
            resolve([]);
          })
          .catch((error) => {
            console.log(TAG, error);
            reject(error);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  getTelegramMessage(resi: ResidentType, limit: 1 | 10 = 1) {
    const that = this;
    const currentGroup = that.group.currentGroup;
    return new Promise<telegramMessage[]>((resolve, reject) => {
      try {
        firestore()
          .collection("telegram_users")
          .doc(resi.telegram)
          .collection("messages")
          .orderBy("creationDate", "desc")
          .limit(limit)
          .get()
          .then((snap) => {
            if (snap.empty) {
              resolve([]);
              return;
            }
            const arr: telegramMessage[] = [];
            snap.forEach((item) => {
              const data: any = item.data();
              arr.push(data);
            });
            resolve(arr);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  saveAccess(
    visitor: ResidentType,
    resident: ResidentType,
    exit = true,
    byAdmin = false,
    comment: string = "",
  ): Promise<string> {
    const that = this;
    const currentGroup = that.group.currentGroup;

    const newAccess = new ResidentAccess("", {
      idValidator: resident.id,
      idResident: visitor.id,
      comment: comment,
      creationDate: utils.dates.dateNowUnix(),
      sector: resident.sector,
      exit: exit,
    });

    return new Promise<string>((resolve, reject) => {
      try {
        console.log(TAG, "save access");
        const newAccessRef = firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("access")
          .doc();

        newAccessRef
          .set(newAccess.exportToUpload())
          .then(() => {
            resolve(newAccessRef.id);
          })
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }
  getAccessHistory(
    group: GroupType,
    specificResident: ResidentType | null = null,
    callBack: (data: ResidentAccess[]) => void,
  ) {
    const accessRef = (() => {
      if (specificResident !== null) {
        if (!specificResident.isEmpty()) {
          return firestore()
            .collection("groups")
            .doc(group.id)
            .collection("access")
            .where("idResident", "==", specificResident.id)
            .orderBy("creationDate", "desc");
        }
      }
      return firestore()
        .collection("groups")
        .doc(group.id)
        .collection("access")
        .orderBy("creationDate", "desc");
    })();

    let unsubs: () => void | null = () => null;
    let lastDocDate: number = 0;
    const arr: ResidentAccess[] = [];
    const getSnap = () => {
      const onResult = (
        snap: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
      ) => {
        if (!snap.empty) {
          snap.forEach((data) => {
            if (
              !utils.objects.arrayHasObjectChildEqualTo(arr, "id", data.id)
                .isEqual
            ) {
              const newData = new ResidentAccess(data.id, <any>data.data());
              if (
                arr.length > 0 &&
                newData.creationDate > arr[0].creationDate
              ) {
                arr.unshift(newData);
              } else {
                arr.push(newData);
              }
            }
          });
          lastDocDate = arr[arr.length - 1].creationDate;
        }
        console.log(TAG, "access list", arr);
        callBack(arr);
      };
      const onError = (err: any) => {
        console.log(TAG, err);
        callBack([]);
      };
      if (lastDocDate > 0) {
        unsubs = accessRef
          .startAfter(lastDocDate)
          .limit(5)
          .onSnapshot(onResult, onError);
      } else {
        unsubs = accessRef.limit(5).onSnapshot(onResult, onError);
      }
    };
    getSnap();
    return {
      unsubs: () => {
        if (unsubs) unsubs();
      },
      getMoreAccess: () => {
        if (unsubs) unsubs();
        getSnap();
      },
    };
  }
  getVehicles(resident: ResidentType, callBack: (data: VehicleType[]) => void) {
    const that = this;
    const currentGroup = that.group.currentGroup;
    const ref = firestore()
      .collection("groups")
      .doc(currentGroup)
      .collection("vehicles")
      .where("idResident", "==", resident.id);
    const unsubscribe = ref.onSnapshot(
      (snap) => {
        if (snap.empty) {
          callBack([]);
          return;
        }
        const data: VehicleType[] = [];
        snap.docs.forEach((doc) => {
          data.push(new VehicleType(doc.id, <any>doc.data()));
        });
        callBack(data);
      },
      (err) => {
        callBack([]);
      },
    );
    return unsubscribe;
  }
  createVehicle(resident: ResidentType, data: VehicleType) {
    const that = this;
    const currentGroup = that.group.currentGroup;
    const ref = firestore()
      .collection("groups")
      .doc(currentGroup)
      .collection("vehicles");
    return new Promise<string>((resolve, reject) => {
      try {
        ref
          .where("licensePlate", "==", data.licensePlate)
          .get()
          .then((snap) => {
            if (snap.empty) {
              ref
                .add(data.exportToUpload())
                .then(() => {
                  resolve("OK");
                })
                .catch((err) => {
                  reject(err);
                });
              return;
            }
            // reject("The license plate has been registered to another user");
            reject(
              "Vehiculo ya esta registrado,confirma la placa o busca por vehiculo para revisar el dueño actual del vehiculo.",
            );
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
}
