import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const PauseIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 330 330" {...props}>
      <Path
        d="M230 0c-8.284 0-15 6.716-15 15v300c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15zM100 0c-8.284 0-15 6.716-15 15v300c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15z"
        fill={color}
      />
    </Svg>
  );
};
export default PauseIcon;
