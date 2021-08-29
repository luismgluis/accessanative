import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import Svg, { Circle, SvgProps } from "react-native-svg";
import { VisibleAnim } from "../../../libs/anim/VisibleAnim";

/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const TAG = "RECORD ICON";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const RecordIcon: React.FC<SvgProps> = (props) => {
  const initAnim = VisibleAnim();
  return (
    <Svg width={500} height={500} viewBox="0 0 500 500" {...props}>
      <AnimatedCircle cx={250} cy={250} r={225} fill="#440e14" opacity={0.65} />
      <AnimatedCircle
        cx={250}
        cy={250}
        r={175}
        fill="#8a1815"
        opacity={initAnim}
      />
    </Svg>
  );
};
export default RecordIcon;
