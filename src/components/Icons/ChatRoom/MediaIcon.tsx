import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const MediaIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={335} height={335} viewBox="0 0 335.52 335.51" {...props}>
      <Path
        fill={color}
        data-original={color}
        d="M335.52 55.6v224.31a55.6 55.6 0 01-55.6 55.6H55.6A55.6 55.6 0 010 279.91V55.6A55.61 55.61 0 0155.6 0h224.32a55.61 55.61 0 0155.6 55.6zm-24.1 223v-94.46L280 145.45a3.33 3.33 0 00-5.34.19s-51 71.66-85.87 120.7A25.7 25.7 0 01146 265l-47.21-73.55a5.26 5.26 0 00-8.69-.37l-67.78 90.7A33.83 33.83 0 0056 312.39h221.6a33.82 33.82 0 0033.82-33.82zm0-134.09V57a33.82 33.82 0 00-33.82-33.87H56A33.82 33.82 0 0022.17 57v185.39l50.15-66.59a28.08 28.08 0 0146.34 2l44.61 71.74a5.58 5.58 0 009.34.23l83.29-120.35a26.14 26.14 0 0141.87-1.49z"
      />
      <Path
        fill={color}
        data-original={color}
        d="M167.7 95.78a42 42 0 1042 42 42 42 0 00-42-42zm0 60a18 18 0 1118-18 18 18 0 01-18 17.97z"
      />
    </Svg>
  );
};
export default MediaIcon;
