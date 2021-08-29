import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const FlashIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 274 274" {...props}>
      <Path
        fill={color}
        d="M207 116h-58l50-88c1-2 1-5 0-7s-4-3-6-3h-84c-3 0-6 2-7 5L60 149c-1 2 0 4 1 6s3 3 6 3h59l-38 89c-1 3 0 7 3 9s7 1 9-1l112-126c4-5 1-12-5-12zm-88 96l25-59c2-5-1-10-6-10H78l37-112h67l-50 88c-3 5 1 10 6 10h54l-73 82zm0 0z"
      />
      <Path fill="none" d="M0 0H274V274H0z" />
    </Svg>
  );
};
export default FlashIcon;
