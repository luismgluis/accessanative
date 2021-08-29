import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@ui-kitten/components";
import React from "react";
import api from "../../../../libs/api/api";
import { ResidentType } from "../../../../libs/types/ResidentType";
import utils from "../../../../libs/utils/utils";

const TAG = "USER ACCESS SEACH MODULE";
export default class UserAccessSearchModule {
  getUsersByIdCard: (value: string) => Promise<ResidentType>;
  getUsersBySector: (value: string) => Promise<Array<ResidentType>>;
  getUsersByVehicle: (value: string) => Promise<ResidentType>;
  sectorRecentStoragePath: string;
  constructor() {
    //
    this.getUsersByIdCard = getUsersByIdCard;
    this.getUsersBySector = getUsersBySector;
    this.getUsersByVehicle = getUsersByVehicle;
    this.sectorRecentStoragePath = "USER_SEARCH_SECTOR";
  }
  async getSectorRecents(): Promise<string[]> {
    const data = await AsyncStorage.getItem(this.sectorRecentStoragePath).catch(
      () => null,
    );
    if (data == null) {
      return [];
    }
    try {
      const arr = JSON.parse(data);
      return utils.objects.arrayOrderAsc(arr);
    } catch (error) {}
    return [];
  }
  async addSectorRecents(newItem: string): Promise<boolean> {
    console.log(TAG, "addsectorrecents");
    let data = await this.getSectorRecents();
    data = data.filter((item) => item !== newItem);
    data.push(newItem);
    if (data.length > 5) {
      data.shift();
    }
    AsyncStorage.setItem(this.sectorRecentStoragePath, JSON.stringify(data));
    return true;
  }
}

export const getUsersByIdCard = (value: string): Promise<ResidentType> => {
  return new Promise<ResidentType>((resolve, reject) => {
    try {
      api.residents
        .searchResident("idCard", value)
        .then((data) => {
          if (data.length > 0) {
            resolve(data[0]);
            return;
          }
          reject(null);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getUsersBySector = (
  value: string,
): Promise<Array<ResidentType>> => {
  return new Promise<Array<ResidentType>>((resolve, reject) => {
    try {
      api.residents
        .searchResident("sector", value)
        .then((data) => {
          if (data == null) {
            reject([]);
            return;
          }
          if (data.length > 0) {
            resolve(data);
            return;
          }
          reject([]);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getUsersByVehicle = (value: string): Promise<ResidentType> => {
  return new Promise<ResidentType>((resolve, reject) => {
    console.log(TAG, "get users car");
    try {
      api.residents
        .searchResident("vehicle", value)
        .then((data) => {
          if (data == null) {
            reject([]);
            return;
          }
          if (data.length > 0) {
            resolve(data[0]);
            return;
          }
          reject([]);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
