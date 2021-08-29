import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHomeConfigRedux } from "../../reducers/actions/actionsGeneralValues";
import { HomeConfigRedux } from "../../reducers/generalValues";
const TAG = "USE HOME CONFIG";
export function useHomeConfig() {
  const [config, setConfig] = useState<HomeConfigRedux>({
    pageSelected: 0,
  });

  useSelector((store: any) => {
    try {
      const homeConfig: HomeConfigRedux = store.generalValues.homeConfig;
      let changed = false;
      if (homeConfig.pageSelected !== config.pageSelected) {
        changed = true;
      }
      if (changed) setConfig(homeConfig);
      return homeConfig;
    } catch (error) {
      console.log(TAG, error);
    }
    return 0;
  });
  return config;
}

export function useSetHomeConfig() {
  const dispatch = useDispatch();
  return useCallback((homeConfig: HomeConfigRedux) => {
    dispatch(setHomeConfigRedux(homeConfig));
  }, []);
}
