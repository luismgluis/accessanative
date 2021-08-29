import { View, ViewProps } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import * as generalActions from "./../../../reducers/actions/actionsGeneralValues";
import { useTheme } from "../../hooks/useTheme";

const styleFlex = { flex: 1 };

const TAG = "FATHER PANEL";

const FatherPanel: React.FC<ViewProps> = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const onSuperContainerLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;

    dispatch(generalActions.setTotalHeight(height));
  };
  const nstyles = {
    ...styleFlex,
    backgroundColor: theme.colors["color-info-700"],
  };
  return (
    <View style={nstyles} onLayout={onSuperContainerLayout}>
      {props.children}
    </View>
  );
};
export default FatherPanel;
