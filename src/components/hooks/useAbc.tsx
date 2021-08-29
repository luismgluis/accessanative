import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { english } from "../../lang/english";
import { spanish } from "../../lang/spanish";
import { setLanguage } from "../../reducers/actions/actionsGeneralValues";

type LanguageType = typeof spanish;
type Idioms = "english" | "spanish" | "";

const TAG = "ABC";
const pathStorage = "config/language";

export function useAbc() {
  const [abc, setAbc] = useState<LanguageType>(english);
  const [currentLang, setCurrentLang] = useState<Idioms>("");
  const setLang = useSetAbc();
  useSelector((store: any) => {
    try {
      const language: Idioms = store.generalValues.language;
      if (language !== currentLang || currentLang === "") {
        if (language === "english") {
          setAbc(english);
          setCurrentLang("english");
        } else if (language === "spanish") {
          setAbc(spanish);
          setCurrentLang("spanish");
        } else {
          AsyncStorage.getItem(pathStorage).then((data) => {
            if (data) {
              if (data === "english" || data === "spanish") {
                setLang("spanish");
                return;
              }
              setLang("spanish");
            }
          });
        }
      }
      return language;
    } catch (error) {
      console.log(TAG, error);
    }
    return 0;
  });
  return { abc: abc, language: currentLang };
}

export function useSetAbc() {
  const dispatch = useDispatch();
  return useCallback((language: Idioms) => {
    //AsyncStorage.setItem(pathStorage, language);
    dispatch(setLanguage(language));
  }, []);
}
