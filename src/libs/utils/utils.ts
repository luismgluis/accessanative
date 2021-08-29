import Dates from "./dates";
import Media from "./media";
import Objects from "./objects";
import RNFS from "react-native-fs";
import generalUtils from "./generalUtils";
const TAG = "UTILS";
export interface fileInfo {
  fileName: string;
  path: string;
}

class Utils extends generalUtils {
  dates: Dates;
  media: Media;
  objects: Objects;

  constructor() {
    super();
    this.dates = new Dates();
    this.objects = new Objects();
    this.media = new Media();
    /* generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
    };*/
  }

  getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  rulethree(valueA: number, valueAEqual: number, valueB: number) {
    //si valueA seria valueAEqual entonces valueB seria... return
    return (valueAEqual * valueB) / valueA;
  }
  createDirectory(pathBase: string, path: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await RNFS.exists(`${pathBase}/${path}`)
          .then((existsDir) => {
            if (!existsDir) {
              RNFS.mkdir(`${pathBase}/${path}`)
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  console.error(TAG, "dir create error", err);
                });
              return;
            }
            resolve(true);
          })
          .catch((err) => {
            console.error(TAG, "dir exist error", err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  createFile(path: string, fileName: string, directory = "CACHE") {
    const that = this;
    const pathDir = ((): string => {
      if (directory === "CACHE") {
        return RNFS.CachesDirectoryPath;
      }
      return RNFS.DocumentDirectoryPath;
    })();

    const [myFileName, myFileExtension] = (() => {
      const f: string = that.generateKey(fileName.split(".")[0]);
      const ex: string = fileName.split(".")[1];
      return [f, ex];
    })();

    return new Promise<fileInfo>(async (resolve, reject) => {
      try {
        const arrPath = path.split("/");
        let pathColletion = "";
        for (const key in arrPath) {
          const dir = arrPath[key];
          pathColletion += "/" + dir;
          await that.createDirectory(pathDir, pathColletion);
        }
        const finalPath = `${pathDir}/${path}/${myFileName}.${myFileExtension}`;

        RNFS.write(finalPath, "")
          .then((val) => {
            resolve({
              fileName: myFileName,
              path: finalPath,
            });
          })
          .catch((err) => {
            console.error(TAG, "write file error", err);
            reject(null);
          });
      } catch (error) {
        reject(null);
      }
    });
  }

  timeOut(milisecs: number) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(true);
        }, milisecs);
      } catch (error) {
        reject(null);
      }
    });
  }
}
export default new Utils();
