import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Portal } from "react-native-portalize";
import { useSelector } from "react-redux";
import utils from "../../../libs/utils/utils";

import { VisibleAnim } from "../../../libs/anim/VisibleAnim";
import { useTheme } from "../../hooks/useTheme";

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "red",
  },
});

const AnimatedView = Animated.createAnimatedComponent(View);

const Bloking: React.FC<any> = ({ keyy, style, startVisible }) => {
  const opacityAnim = VisibleAnim(
    utils.getRandomNumber(80, 600),
    startVisible ? 0 : 1,
    false,
  );

  const styleSebo = {
    ...style,
    borderWidth: 1,
    opacity: opacityAnim,
  };

  return (
    <>
      <AnimatedView key={keyy} style={styleSebo} />
    </>
  );
};

const TAG = "TRANSITION BLOCKS PORTAL";
type TransitionBlocksPortalProps = {
  style?: StyleProp<ViewStyle>;
  color: string;
  visible: boolean;
};
const TransitionBlocksPortal: React.FC<TransitionBlocksPortalProps> = ({
  style,
  color,
  visible,
}) => {
  //useForceUpdate();
  const theme = useTheme();
  const [data, setData] = useState<string[]>([]);
  const h: number = useSelector((store) => {
    const tHeight = utils.objects.cloneObject(store).generalValues.totalHeight;
    return tHeight;
  });

  const containerStyles = useMemo(() => {
    return {
      container: {
        //backgroundColor: "red",
        height: h,
        width: Dimensions.get("screen").width,
      },
    };
  }, [h]);

  useEffect(() => {
    const arr = (() => {
      const size = containerStyles.container;
      const minScreenLateral =
        size.width < size.height ? size.width : size.height;
      const columns = 3;
      const lateral = minScreenLateral / columns;
      const rows = (() => {
        let counter = 0;
        let result = 0;
        while (counter < size.height) {
          result++;
          counter += lateral;
        }
        return result;
      })();
      const rowStyle = {
        width: "100%",
        height: lateral,
        flexDirection: "row",
        //backgroundColor: "green",
      };
      const boxStyle = {
        width: lateral,
        height: lateral,
        backgroundColor: theme.colors["color-primary-900"],
        borderWidth: 1,
        borderColor: theme.colors["color-primary-500"],
      };
      const arrayResult: Array<any> = [];
      for (let index = 0; index < rows; index++) {
        const row: Array<any> = [];
        for (let cols = 0; cols < columns; cols++) {
          row.push(
            <Bloking
              key={utils.generateKey(`TBP${index}${cols}`)}
              style={boxStyle}
              startVisible={visible}
            />,
          );
        }
        arrayResult.push(
          <View
            style={utils.objects.cloneObject(rowStyle)}
            key={utils.generateKey(`TBPRow${index}`)}>
            {row}
          </View>,
        );
      }

      return arrayResult;
    })();
    setData(arr);
  }, [setData, theme, visible, containerStyles.container]);

  return (
    <Portal>
      <View style={containerStyles.container}>{data}</View>
    </Portal>
  );
};
export default TransitionBlocksPortal;
