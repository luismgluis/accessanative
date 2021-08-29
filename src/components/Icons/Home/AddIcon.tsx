import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const AddICon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <Path
        d="M368 272H144c-8.832 0-16-7.168-16-16s7.168-16 16-16h224c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0"
        fill={color}
        data-original="#000000"
      />
      <Path
        d="M256 384c-8.832 0-16-7.168-16-16V144c0-8.832 7.168-16 16-16s16 7.168 16 16v224c0 8.832-7.168 16-16 16zm0 0"
        fill={color}
        data-original="#000000"
      />
      <Path
        d="M453.332 512H58.668C26.305 512 0 485.695 0 453.332V58.668C0 26.305 26.305 0 58.668 0h394.664C485.695 0 512 26.305 512 58.668v394.664C512 485.695 485.695 512 453.332 512zM58.668 32C43.968 32 32 43.969 32 58.668v394.664C32 468.032 43.969 480 58.668 480h394.664c14.7 0 26.668-11.969 26.668-26.668V58.668C480 43.968 468.031 32 453.332 32zm0 0"
        fill={color}
        data-original="#000000"
      />
    </Svg>
  );
};
export default AddICon;
