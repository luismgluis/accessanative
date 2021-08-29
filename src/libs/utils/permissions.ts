import { PermissionsAndroid } from "react-native";
const TAG = "PERMISSIONS"; 
const requestPermission = async (title:any, message:any, permissiontype:any) => {
  try {
    const granted = await PermissionsAndroid.request(permissiontype, {
      title: title,
      message: message,
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.warn(TAG, "You can use permission", permissiontype);
      return true;
    }
    console.error(TAG, "permission denied", permissiontype);
    return false;
  } catch (err) {
    console.warn(TAG, "permission fail", err);
    return false;
  }
};
const requestAudioPermission = async () => {
  return await requestPermission(
    "Please allow microphone access",
    "This is necesary Record audio",
    permissionsTypes.AUDIO,
  );
};
const requestCameraPermission = async () => {
  return await requestPermission(
    "Please allow camera access",
    "This is necesary to take a picture",
    permissionsTypes.CAMERA,
  );
};
const requestReadFilesPermission = async () => {
  return await requestPermission(
    "Please allow read access",
    "This is necesary to access pictures",
    permissionsTypes.READ,
  );
};
const requestWriteFilesPermission = async () => {
  return await requestPermission(
    "Please allow write access",
    "This is necesary to access pictures",
    permissionsTypes.WRITE,
  );
};

const checkPermission = async (permission:any) => {
  try {
    const res = await PermissionsAndroid.check(permission);

    return res;
  } catch (error) {
    return null;
  }
};

const checkAllPermissions = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    let cameraGranted = false;
    let readGranted = false;
    let writeGranted = false;
    function Write() {
      checkPermission(permissionsTypes.WRITE)
        .then((res) => {
          if (!res) {
            requestWriteFilesPermission().then((resWrite) => {
              writeGranted = resWrite;
              if (writeGranted) {
                resolve(true);
                return;
              }
              reject("WRITE");
            });
            return;
          }
          requestWriteFilesPermission().then((res) => {
            resolve(true);
          });
        })
        .catch(() => {
          reject("READ");
        });
    }
    function Read() {
      checkPermission(permissionsTypes.READ)
        .then((res) => {
          if (!res) {
            requestReadFilesPermission().then((resRead) => {
              readGranted = resRead;
              if (readGranted) {
                Write();
                return;
              }
              reject("READ");
            });
            return;
          }
          requestReadFilesPermission().then((res) => {
            Write();
          });
        })
        .catch(() => {
          reject("READ");
        });
    }
    function Cam() {
      checkPermission(permissionsTypes.CAMERA)
        .then((res) => {
          if (!res) {
            requestCameraPermission().then((resCam) => {
              cameraGranted = resCam;
              if (cameraGranted) {
                Read();
                return;
              }
              reject("CAMERA");
            });
            return;
          }
          Read();
        })
        .catch(() => {
          reject("CAMERA");
        });
    }
    Cam();
  });
};

const permissionsTypes = {
  CAMERA: PermissionsAndroid.PERMISSIONS.CAMERA,
  READ: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  WRITE: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  AUDIO: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
};

export default {
  requestAudioPermission,
  requestCameraPermission,
  requestReadFilesPermission,
  requestWriteFilesPermission,
  checkPermission,
  checkAllPermissions,
  permissionsTypes,
};
