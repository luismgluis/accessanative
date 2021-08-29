import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Toggle } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import * as generalActions from "./../../../reducers/actions/actionsGeneralValues";
import TransitionBlocksPortal from "../TransitionBlocksPortal/TransitionBlocksPortal";
import utils from "../../../libs/utils/utils";
import { useSetTheme } from "../../hooks/useTheme";
import { useAbc } from "../../hooks/useAbc";

const styles = StyleSheet.create({ container: {} });

const TAG = "THEME TOGGLE";
type ThemeToggleProps = {};
const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const dicc = useAbc().abc.theme;
  const setTheme = useSetTheme();
  const [checked, setChecked] = useState(false);
  const [keyTransition, setKeyTransition] = useState(
    utils.generateKey("TransitionBlocksPortal"),
  );
  const [tPanelVisible, setTPanelVisible] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const anim = useCallback(
    async (checked: boolean) => {
      setTPanelVisible(true);
      setTransitionVisible(true);
      await utils.timeOut(750);
      console.log(TAG, checked);
      setTheme(!checked ? 0 : 1);
      await utils.timeOut(100);
      setTransitionVisible(false);
      await utils.timeOut(650);
      setTPanelVisible(false);
    },
    [setTPanelVisible, setTheme, setTransitionVisible],
  );
  const onCheckedChange = (check: boolean) => {
    setChecked(check);
    anim(check).then(() => {
      /* */
    });
  };
  return (
    <>
      {tPanelVisible && (
        <TransitionBlocksPortal
          visible={transitionVisible}
          key={keyTransition}
          color="red"
        />
      )}
      <Toggle checked={checked} onChange={onCheckedChange}>
        {checked ? dicc.dark : dicc.light}
      </Toggle>
    </>
  );
};
export default ThemeToggle;
