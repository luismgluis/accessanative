import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ViewProps,
  ScrollView,
  Pressable,
  Animated,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "react-native-portalize";
import Panel from "../Panel/Panel";
import utils from "../../../libs/utils/utils";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import BarsIcon from "../../Icons/Alert/BarsIcon";
import BottomSheet from "reanimated-bottom-sheet";

import { useKeyboard } from "../../hooks/useKeyBoard";
import { useTheme } from "../../hooks/useTheme";
const styles = StyleSheet.create({
  container: {
    top: 0,
    backgroundColor: "#00000026",
  },
  panel: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopEndRadius: 40,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  panelTop: { backgroundColor: "transparent" },
  scroll: {
    flex: 1,
    backgroundColor: "transparent",
  },
  panelBottomBorder: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    width: "100%",
    height: 20,
  },
  panelBottomBorderBack: {
    width: "100%",
    height: 20,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  panelBar: {
    width: "100%",
    height: 35,
    alignItems: "center",
  },
});

const TAG = "CUSTOM ALERT";
const AnimateView = Animated.createAnimatedComponent(View);

export interface CAlertProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  scrollDown?: number;
  canOutsideClose?: boolean;
  onClose: () => void;
}
const CAlert: React.FC<CAlertProps> = ({
  scrollDown = -1,
  style,
  children,
  canOutsideClose,
  onClose = null,
}) => {
  const scrollRef: any = useRef<ScrollView>();
  const [alertOpacity, setAlertOpacity] = useState(0);
  const [keyBoardHeight] = useKeyboard();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [generalValues, setGeneralValues] = useState({ keyBoardHeight: 0 });
  const theme = useTheme();
  const panelStyles = {
    ...utils.objects.cloneObject(style),
    ...styles.panel,
  };
  const totalHeight: number = useSelector((store: any) => {
    const tHeight = store.generalValues.totalHeight;
    return tHeight;
  });

  const scrollDownFn = useCallback(
    (distance = 0) => {
      [1].forEach((val) => {
        utils.timeOut(100 * val).then(() => {
          if (distance === 0) {
            scrollRef.current?.scrollToEnd({ animated: true });
            return;
          }
          scrollRef.current?.scrollTo({
            y: distance,
            animated: true,
          });
        });
      });
    },
    [scrollRef],
  );

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (keyBoardHeight > 0 && generalValues.keyBoardHeight !== keyBoardHeight) {
      setGeneralValues({ keyBoardHeight: keyBoardHeight });
      const scrollH = scrollHeight > 0 ? scrollHeight : scrollDown;
      scrollDownFn(keyBoardHeight + scrollH);
    } else if (generalValues.keyBoardHeight !== keyBoardHeight) {
      generalValues.keyBoardHeight = keyBoardHeight;
      setGeneralValues({ keyBoardHeight: keyBoardHeight });
    }
  }, [scrollHeight, scrollDown, keyBoardHeight, scrollDownFn, generalValues]);

  useEffect(() => {
    if (scrollDown > -1) {
      setTimeout(() => {
        scrollDownFn(scrollDown + 300);
      }, 50);
    }
    setTimeout(() => {
      setAlertOpacity(1);
    }, 50);
  }, [scrollDown, scrollDownFn]);

  const closeOutSide = () => {
    console.log(onClose);
    if (!canOutsideClose) return;
    if (onClose !== null) onClose();
  };
  //const anim = VisibleAnim(500, 0, false, 150);
  //alertOpacity === 0 ? alertOpacity : anim
  const containerStyles = { opacity: alertOpacity };
  // return (
  //   <BottomSheet
  //     // ref={sheetRef}
  //     snapPoints={[450, 300, 0]}
  //     borderRadius={10}
  //     renderContent={() => children}
  //   />
  // );
  return (
    <Portal>
      <AnimateView style={containerStyles}>
        <Panel level="1" totalHeight={0} style={styles.container}>
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            onScroll={(e) => setScrollHeight(e.nativeEvent.contentOffset.y)}>
            <Pressable onPress={closeOutSide}>
              <Panel style={styles.panelTop} totalHeight={totalHeight * 0.1} />
            </Pressable>
            <Panel level="5" style={panelStyles}>
              <View style={styles.panelBar}>
                <BarsIcon
                  width={50}
                  height={30}
                  color={theme.colors["color-primary-500"]}
                />
              </View>
              {children}
            </Panel>
            <Panel style={styles.panelBottomBorderBack} />
          </ScrollView>
          <LinearGradient
            colors={["#00000000", "#00000042"]}
            style={styles.panelBottomBorder}
          />
        </Panel>
      </AnimateView>
    </Portal>
  );
};
export default CAlert;
