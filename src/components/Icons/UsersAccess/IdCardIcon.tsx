import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const IdCardIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width="520px" height="520px" viewBox="0 0 376 376" {...props}>
      <Path fill="none" d="M0 0H376V376H0z" />
      <G fill={color} fillRule="nonzero">
        <Path
          d="M325 321H51c-22 0-41-18-41-41V95c0-22 18-41 41-41h274c22 0 41 18 41 41v185c0 22-18 41-41 41zM51 76c-10 0-19 8-19 19v185c0 10 8 19 19 19h274c10 0 19-8 19-19V95c0-10-8-19-19-19H51zm0 0z"
          data-original="#000000"
        />
        <Path
          d="M121 188c-20 0-37-17-37-37s17-37 37-37 37 17 37 37-17 37-37 37zm0-52c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15zm0 0zM177 262c-6 0-11-5-11-11v-7c0-10-8-19-19-19H95c-10 0-19 8-19 19v7c0 6-5 11-11 11s-11-5-11-11v-7c0-22 18-41 41-41h52c22 0 41 18 41 41v7c0 6-5 11-11 11zm0 0zM310 144h-82c-6 0-11-5-11-11s5-11 11-11h82c6 0 11 5 11 11s-5 11-11 11zm0 0zM310 203h-82c-6 0-11-5-11-11s5-11 11-11h82c6 0 11 5 11 11s-5 11-11 11zm0 0zM310 262h-82c-6 0-11-5-11-11s5-11 11-11h82c6 0 11 5 11 11s-5 11-11 11zm0 0z"
          data-original="#000000"
        />
      </G>
    </Svg>
  );
};
export default IdCardIcon;
