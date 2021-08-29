import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function VisibleAnim(
  duration = 500,
  intialVal = 0,
  loop = false,
  delay = 0,
): Animated.Value {
  const initAnim = useRef(new Animated.Value(intialVal)).current;
  useEffect(() => {
    let blockAnimation = false;
    const animation = (toVal = 1) => {
      Animated.timing(initAnim, {
        toValue: toVal,
        duration: duration,
        useNativeDriver: false,
        isInteraction: false,
      }).start(() => {
        if (blockAnimation) {
          return;
        }
        if (toVal === 1) {
          animation(0);
          return;
        }
        animation(1);
      });
    };
    //animation(intialVal === 0 ? 1 : 0);
    if (delay === 0) animation(1);
    if (delay > 0) {
      setTimeout(() => {
        animation(1);
      }, delay);
    }
    if (!loop) {
      blockAnimation = true;
    }
    return () => {
      blockAnimation = true;
    };
    //Animated.loop(a, { iterations: 10000 }).start();
  }, [duration, initAnim, intialVal, loop, delay]);

  //console.log(initAnim);
  return initAnim;
}

export function InvisibleAnim(duration = 500): Animated.Value {
  return VisibleAnim(duration, 1, false);
}
