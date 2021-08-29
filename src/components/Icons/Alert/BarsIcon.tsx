import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const BarsIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={144} viewBox="0 0 512 144" {...props}>
      <Path
        d="M16 32h480a16 16 0 000-32H16a16 16 0 000 32zM496 112H16a16 16 0 000 32h480a16 16 0 000-32z"
        fill={color}
      />
    </Svg>
  );
};
export default BarsIcon;
