import { View, ViewProps } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { setTotalHeight } from "./src/reducers/actions/actionsGeneralValues";

const TAG = "APP MAIN";

export class AppMainModuleAlert {
  updateFunsArr: Array<(newVal: any) => void>;
  value: any;
  closed: boolean;
  static instance: any;
  constructor() {
    this.updateFunsArr = [];
    this.value = null;
    this.closed = true;
    if (typeof AppMainModuleAlert.instance === "object") {
      return AppMainModuleAlert.instance;
    }
    AppMainModuleAlert.instance = this;
  }
  onUpdate(callBack: (newVal: any) => void): void {
    this.updateFunsArr.push(callBack);
  }
  isClosed(): boolean {
    return this.closed;
  }
  close(): void {
    try {
      this.setChild(null);
    } catch (error) {}
  }
  setChild(newVal: any = null): void {
    if (newVal == null) {
      this.closed = true;
      newVal = <></>;
    } else {
      this.closed = false;
    }
    this.value = newVal;
    this.updateFunsArr.forEach((fn) => fn(newVal));
  }
}

const AlertView: React.FC<ViewProps> = () => {
  const module = useMemo(() => new AppMainModuleAlert(), []);

  const [child, setChild] = useState(<></>);
  useEffect(() => {
    module.onUpdate((newVal) => {
      setChild(newVal);
    });
  }, [module]);

  return <>{child}</>;
};

const styleFlex = {
  flex: 1,
  backgroundColor: "#002345",
};

const AppMain: React.FC<ViewProps> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const onSuperContainerLayout = useCallback(
    (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      //console.log(TAG, x, y, width, height);
      dispatch(setTotalHeight(height));
    },
    [dispatch],
  );

  const nstyles = {
    ...styleFlex,
    backgroundColor: theme["color-info-700"],
  };
  return (
    <>
      <AlertView />
      <View style={nstyles} onLayout={onSuperContainerLayout}>
        {props.children}
      </View>
    </>
  );
};
export default AppMain;
