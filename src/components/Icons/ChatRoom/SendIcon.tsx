import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
interface SendIconType extends SvgProps {
  colorTwo: string;
}
const SendIcon: React.FC<SendIconType> = (props) => {
  const color = props.color || "#818181";
  const colorTwo = props.colorTwo || "#818181";

  return (
    <Svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <Path
        d="M507.607 4.395a14.992 14.992 0 00-16.177-3.32l-482 192.798a15 15 0 00-.976 27.423l190.067 92.182 92.182 190.068a14.998 14.998 0 0027.423-.975L510.928 20.573a15.002 15.002 0 00-3.321-16.178z"
        fill={color}
        data-original={color}
      />
      <Path
        d="M507.607 4.395L198.522 313.477l92.182 190.068a14.998 14.998 0 0027.423-.975L510.928 20.573a15.002 15.002 0 00-3.321-16.178z"
        fill={colorTwo}
        data-original={colorTwo}
      />
    </Svg>
  );
};

export default SendIcon;
