import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import utils from "../../libs/utils/utils";
import { setTheme } from "../../reducers/actions/actionsGeneralValues";
import { theme0 } from "../../themes/theme0";
import { theme1 } from "../../themes/theme1";

const TAG = "USE THEME";

const theme1X = (() => {
  const theme = utils.objects.cloneObject(theme1);
  const obj: any = {};
  Object.keys(theme).forEach((item) => {
    const element = theme[item];
    const nameArr = item.split("-");
    if (!isNaN(Number(nameArr[2]))) {
      const num = 1000 - Number(nameArr[2]);
      //console.log(TAG, num, 1000 - num);
      obj[`${nameArr[0]}-${nameArr[1]}-${num}`] = element;
    }
  });
  console.log(TAG, obj);
  return obj;
})();

type ThemeType = {
  colors: typeof theme0;
  number: number;
  colorsx: any;
};
export function useTheme() {
  const [theme, settTheme] = useState<ThemeType>({
    colors: theme0,
    number: -1,
    colorsx: theme0,
  });

  useSelector((store: any) => {
    try {
      const newTheme = store.generalValues.theme;
      // console.log(TAG, newTheme);
      if (!isNaN(newTheme)) {
        if (theme.number === newTheme) return newTheme;
        if (newTheme === 1) {
          settTheme({ colors: theme1X, colorsx: theme1X, number: 1 });
        } else {
          settTheme({ colors: theme0, colorsx: theme0, number: 0 });
        }
      }
      return newTheme;
    } catch (error) {
      console.log(TAG, error);
    }
    return 0;
  });
  return theme;
}

export function useSetTheme() {
  const dispatch = useDispatch();
  return useCallback((themeNum: number) => {
    dispatch(setTheme(themeNum));
  }, []);
}
