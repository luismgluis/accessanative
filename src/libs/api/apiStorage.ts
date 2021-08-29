import storage from "@react-native-firebase/storage";

const TAG = "API STORAGE";

class ApiStorage {
  constructor() {
    /* */
  }
  saveFile(
    pathStorageFile: string,
    uri: string,
    callBackProgress: (progress: number) => void,
    resolve: (uriResult: string) => void,
    reject: (reason: string) => void = (data: any) => null,
  ): void {
    //const pathStorageFile = `business/${businessId}/products/${resultNewProduct.id}`;

    const reference = storage().ref(pathStorageFile);
    const task = reference.putFile(uri);

    task.on("state_changed", (taskSnapshot) => {
      callBackProgress(taskSnapshot.bytesTransferred);
    });

    task.then(() => {
      reference
        .getDownloadURL()
        .then((url) => {
          if (url !== null) {
            resolve(url);
            return;
          }
          reject("FAIL URL GENERATE");
        })
        .catch((err) => {
          console.error(TAG, "FAIL URL GENERATE", err);
          reject("FAIL URL GENERATE2");
        });
    });
    task.catch((error) => {
      console.error(TAG, "Upload Product Catch", error);
      //resultNewProduct.delete();
      reject("Upload image failed");
    });
  }
}
export default ApiStorage;
