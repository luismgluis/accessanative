import { Image } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import Dates from "./dates";
import Objects from "./objects";
import generalUtils from "./generalUtils";
import { FeedImageType } from "../../components/ui/FeedImages/FeedImages";
const TAG = "UTILS MEDIA";
type fileDimensions = {
  width: number;
  height: number;
};
export default class media {
  dates: Dates;
  objets: Objects;
  keys: any;
  gUtils: generalUtils;
  constructor() {
    /* */
    this.dates = new Dates();
    this.objets = new Objects();
    this.keys = {};
    this.gUtils = new generalUtils();
  }
  getUniqueKey(path: string): string {
    if (typeof this.keys[path] !== "undefined") {
      return this.keys[path];
    }
    this.keys[path] = this.gUtils.generateKey("MediaUniqueKey");
    return this.keys[path];
  }
  getMediaFiles(
    maxTotalFiles = 1,
    callBack: (result: FeedImageType) => void,
  ): Promise<Array<FeedImageType>> {
    const that = this;
    const cameraRollAnaliceData = (result: CameraRoll.PhotoIdentifiersPage) => {
      const arr = result.edges.map((item) => item.node);
      const dict = arr.reduce((prv: any, cur) => {
        const curValue = {
          type: cur.type,
          location: cur.location,
          timestamp: cur.timestamp,
          ...cur.image,
        };
        if (!prv[cur.group_name]) {
          prv[cur.group_name] = [curValue];
        } else {
          prv[cur.group_name].push(curValue);
        }
        return prv;
      }, {});
      const originalData = Object.keys(dict)
        .sort((a, b) => {
          const rootIndex = "Camera Roll";
          if (a === rootIndex) {
            return -1;
          } else if (b === rootIndex) {
            return 1;
          } else {
            return a < b ? -1 : 1;
          }
        })
        .map((key) => ({
          name: key,
          value: dict[key],
        }));
      //this.setState({ data });
      if (!(originalData.length > 0)) {
        return [];
      }
      return originalData;
    };
    const modelData = (element: any, key: any) => {
      element.key = key;
      element.date = "";
      element.title = "";
      if (typeof element.timestamp !== "undefined") {
        element.title = that.dates.unixToString(element.timestamp, true);
      }
      if (typeof element.title === "undefined") {
        element.title = `item${key}`;
      }
      const newImageItem: FeedImageType = {
        key: key,
        uri: element.uri,
        type: element.type,
        isVideo: `${element.type}`.includes("video"),
        title: element.title,
        timeStamp: element.timestamp,
        duration: 0,
        dimensions: "",
        update: () => {
          /* */
        },
        onPress: (res) => {
          callBack(res);
        },
      };
      return newImageItem;
    };

    const task = (resolve: any, reject: any) => {
      CameraRoll.getPhotos({
        first: maxTotalFiles,
        groupTypes: "All",
        assetType: "All", //"Photos", //defaultProps.assetType,
      })
        .then((result) => {
          const originalData = cameraRollAnaliceData(result);
          const resultArr = Array<FeedImageType>();

          originalData.forEach((folder) => {
            const files = folder.value;
            Object.keys(files).forEach((value, index) => {
              const file = files[index];
              const newData = modelData(file, that.getUniqueKey(file.uri));
              resultArr.push(newData);
            });
          });

          if (resultArr.length > 0) {
            const ordenate = that.objets.arrayOrderAsc(resultArr, "timeStamp");
            resolve(ordenate);
            return;
          }
          resolve([]);
        })
        .catch((err) => {
          console.error("Fail to get photos", err);
          reject(null);
        });
    };
    return new Promise<Array<FeedImageType>>((resolve, reject) => {
      try {
        task(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  getImageSize(imageUri: string): Promise<fileDimensions> {
    return new Promise<fileDimensions>((resolve, reject) => {
      try {
        Image.getSize(imageUri, (imageWidth, imageHeight) => {
          resolve({
            width: imageWidth,
            height: imageHeight,
          });
        });
      } catch (error) {
        reject(null);
      }
    });
  }
}
