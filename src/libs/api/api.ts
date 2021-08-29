import UserType from "../types/UserType";
import auth from "@react-native-firebase/auth";
import RNFS from "react-native-fs";
import ApiStorage from "./apiStorage";
import ApiUsers from "./apiUsers";
import ApiGroup from "./apiGroups";
import ApiRoom from "./apiRoom";
import utils from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import playerSounds from "../utils/playerSounds";
import { ApiResidents } from "./apiResidents";

const TAG = "API";
class Api {
  currentGroup: string;
  storage: ApiStorage;
  users: ApiUsers;
  group: ApiGroup;
  room: ApiRoom;
  residents: ApiResidents;
  currentPlayerSouds: playerSounds;
  static instance: any;
  constructor() {
    this.currentGroup = "";
    this.users = new ApiUsers();
    this.group = new ApiGroup();
    this.storage = new ApiStorage();
    this.room = new ApiRoom();
    this.residents = new ApiResidents();
    this.currentPlayerSouds = new playerSounds();
    if (typeof Api.instance === "object") {
      return Api.instance;
    }
    Api.instance = this;

    return this;
  }
  checkLoginByEmail(email: string, pass: string) {
    const that = this;
    console.log(TAG, "login by", email);
    function login(resolve: any, reject: any) {
      auth() //'grajales805@gmail.com', 'elpepe'
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          const me = auth().currentUser!;
          that.users
            .getUserByID(me.uid)
            .then((data) => {
              that.users.currentUser = data;
              resolve(true);
            })
            .catch((err) => {
              console.error(TAG, err);
              that.users.currentUser = new UserType("", null);
              resolve(false);
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.error(TAG, "That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            console.error(TAG, "That email address is invalid!");
          }
          reject(error);
        });
    }
    return new Promise<boolean>((resolve, reject) => {
      try {
        login(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  logOut() {
    const that = this;
    this.users = new ApiUsers();
    this.group = new ApiGroup();
    this.storage = new ApiStorage();
    this.room = new ApiRoom();
    this.currentPlayerSouds = new playerSounds();
    return auth().signOut();
    //.then(() => console.warn("User signed out!"))
  }
  createUserWithEmail(data: any) {
    const that = this;

    const avaibleToCreate = async () => {
      const user = await that.users.getUserByEmail(data.email);
      if (user !== null) {
        return false;
      }
      return true;
    };
    const saveInfo = (uid: any, resolve: any, reject: any) => {
      const user = new UserType(uid, {
        id: uid,
        name: data.name,
        nickname: `${data.nickname}`.replace(" ", "").toLowerCase(),
        email: `${data.email}`.toLowerCase(),
        creationDate: utils.dates.dateNowUnix(),
        profileImage: data.profileImage.uri,
      });

      that.users
        .saveUser(user)
        .then((result) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
          console.error(TAG, "err", err);
        });
    };
    const create = (resolve: any, reject: any) => {
      auth()
        .createUserWithEmailAndPassword(data.email, data.password1)
        .then((result) => {
          console.error(TAG, "res", result);
          saveInfo(result.user.uid, resolve, reject);
        })
        .catch((err) => {
          reject(err);
        });
    };
    return new Promise<boolean>((resolve, reject) => {
      try {
        create(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  downLoadFile(url: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const saveFile = await AsyncStorage.getItem(url);

        const path = `${utils.generateKey("file")}.media`;

        const down = () => {
          utils.createFile("down", path, "CACHE").then((info) => {
            RNFS.downloadFile({
              fromUrl: url,
              toFile: info.path,
            }).promise.then(async (r) => {
              resolve(info.path);
              await AsyncStorage.setItem(url, info.path);
            });
          });
        };

        if (saveFile == null) {
          down();
          return;
        }
        RNFS.exists(saveFile).then((exists) => {
          if (exists) {
            resolve(saveFile);
            return;
          }
          down();
        });
      } catch (error) {
        reject(null);
      }
    });
  }
}

export default new Api();
