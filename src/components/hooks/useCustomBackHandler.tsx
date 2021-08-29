import React from "react";
import { BackHandler } from "react-native";
import { moveToBackground } from "../../libs/modules/MoveAppToBackground";
const TAG = "CUSTOM BACK HANDLER";

export default function useCustomBackHandler(
  callBack: () => boolean,
): () => void {
  const resultCallBack = React.useCallback(() => {
    const backAction = (): boolean => {
      try {
        if (callBack()) {
          moveToBackground();
        }
      } catch (error) {
        console.error(TAG, error);
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [callBack]);
  return resultCallBack;
}
