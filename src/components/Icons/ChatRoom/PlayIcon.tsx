import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const PlayIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 30.065 30.065" {...props}>
      <Path
        d="M26.511 12.004L6.233.463C4.082-.765 1.889.578 1.889 2.993v24.093c0 2.046 1.332 2.979 2.57 2.979.583 0 1.177-.184 1.767-.543l20.369-12.468c1.024-.629 1.599-1.56 1.581-2.555-.017-.996-.623-1.906-1.665-2.495zm-1.281 2.823L4.862 27.292a1.297 1.297 0 01-.319.147 1.354 1.354 0 01-.04-.353V2.994c0-.248.045-.373.045-.404.08.005.22.046.396.146l20.275 11.541c.25.143.324.267.348.24-.013.034-.098.161-.337.31z"
        fill={color}
      />
    </Svg>
  );
};
export default PlayIcon;
