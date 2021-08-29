import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
interface SearchIconProps extends SvgProps {
  colorTwo: string;
}
const SearchIcon: React.FC<SearchIconProps> = (props) => {
  const color = props.colorTwo || "#818181";
  const colorTwo = props.color || "#b1404a";
  return (
    <Svg width={512} height={512} viewBox="0 0 383.478 383.478" {...props}>
      <Path
        d="M378.775 356.833l-80.457-80.98c-6.792 7.837-14.106 15.673-21.943 21.943l80.457 80.98c3.135 3.135 7.314 4.702 10.971 4.702s7.837-1.567 10.971-4.702c6.271-5.747 6.271-15.674.001-21.943z"
        fill={color}
        data-original={color}
      />
      <Path
        d="M300.408 277.943c24.555-29.257 39.184-67.396 39.184-108.147C339.592 76.278 263.314 0 169.796 0S0 76.278 0 169.796s76.278 169.796 169.796 169.796c41.273 0 78.89-14.629 108.147-39.184a152.239 152.239 0 0022.465-22.465zM31.347 169.796c0-76.278 62.171-138.449 138.449-138.449s138.449 62.171 138.449 138.449-62.171 138.449-138.449 138.449S31.347 246.073 31.347 169.796z"
        fill={colorTwo}
        data-original={colorTwo}
      />
    </Svg>
  );
};
export default SearchIcon;
