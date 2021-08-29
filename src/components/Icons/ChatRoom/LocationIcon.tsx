import * as React from "react";
import Svg, { Path, G, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const LocationICon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <G fill={color}>
        <Path
          d="M256.002 512a14.999 14.999 0 01-12.001-6c-22.843-30.454-42.806-56.771-60.419-79.991C82.115 292.248 61 264.412 61 195 61 87.477 148.477 0 256 0s195 87.477 195 195c0 69.292-21.166 97.209-122.876 231.36-17.537 23.131-37.414 49.348-60.123 79.638A14.995 14.995 0 01256.002 512zM256 30c-90.981 0-165 74.019-165 165 0 59.321 17.784 82.766 116.482 212.879 14.483 19.093 30.553 40.278 48.515 64.146 17.838-23.715 33.817-44.791 48.222-63.789C403.17 277.722 421 254.205 421 195c0-90.981-74.019-165-165-165z"
          data-original={color}
        />
        <Path
          d="M256 300c-57.897 0-105-47.103-105-105S198.103 90 256 90s105 47.103 105 105-47.103 105-105 105zm0-180c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75z"
          data-original={color}
        />
      </G>
    </Svg>
  );
};
export default LocationICon;
