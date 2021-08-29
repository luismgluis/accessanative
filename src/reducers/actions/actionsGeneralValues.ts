import { View } from "react-native";
import { HomeConfigRedux } from "../generalValues";

export const setTotalHeight = (totalHeight: number) => (dispatch: any) => {
  dispatch({
    type: "setTotalHeight",
    payload: totalHeight,
  });
};

export const setTheme = (themeNum: number) => (dispatch: any) => {
  dispatch({
    type: "setTheme",
    payload: themeNum,
  });
};

export const setLanguage = (language: string) => (dispatch: any) => {
  dispatch({
    type: "setLanguage",
    payload: language,
  });
};

export const setAlertsViewRef = (viewRef: React.MutableRefObject<View>) => (
  dispatch: any,
) => {
  dispatch({
    type: "setAlertsViewRef",
    payload: viewRef,
  });
};

export const setHomeConfigRedux = (config: HomeConfigRedux) => (
  dispatch: any,
) => {
  dispatch({
    type: "setHomeConfig",
    payload: config,
  });
};
