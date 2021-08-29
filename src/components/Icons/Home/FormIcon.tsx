import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const FormIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <G fill={color}>
        <Path
          d="M400 0H112C50.144 0 0 50.144 0 112v288c0 61.856 50.144 112 112 112h288c61.856 0 112-50.144 112-112V112C512 50.144 461.856 0 400 0zm80 400c0 44.183-35.817 80-80 80H112c-44.183 0-80-35.817-80-80V112c0-44.183 35.817-80 80-80h288c44.183 0 80 35.817 80 80v288z"
          data-original="#000000"
        />
        <Path
          d="M160 112h-32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zM160 224h-32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zM160 336h-32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16z"
          data-original="#000000"
        />
        <Path data-original="#000000" d="M208 128H400V160H208z" />
        <Path data-original="#000000" d="M208 240H400V272H208z" />
        <Path data-original="#000000" d="M208 352H400V384H208z" />
      </G>
    </Svg>
  );
};
export default FormIcon;
