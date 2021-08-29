import { Layout, StyledComponentProps } from "@ui-kitten/components";
import { Overwrite } from "@ui-kitten/components/devsupport";
import React from "react";
import { ScrollView, ViewProps } from "react-native";
import { useSelector } from "react-redux";

import utils from "../../../libs/utils/utils";
import { useKeyboard } from "../../hooks/useKeyBoard";
import { useTheme } from "../../hooks/useTheme";
const TAG = "PANEL";

declare type LayoutStyledProps = Overwrite<
  StyledComponentProps,
  {
    appearance?: "default" | string;
  }
>;

export interface LayoutProps extends ViewProps, LayoutStyledProps {
  children?: React.ReactNode;
  level?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  totalHeight?: number | string;
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
  withScroll?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
  flexDirection?: "row" | boolean;
  flex?: number;
  width?: string | number;
}

export declare type LayoutElement = React.ReactElement<LayoutProps>;

const Panel: React.FC<LayoutProps> = ({
  children,
  level = "0",
  style,
  paddingVertical = 0,
  paddingHorizontal = 0,
  totalHeight = -1,
  verticalCenter = false,
  horizontalCenter = false,
  flexDirection = false,
  flex = 0,
  withScroll = false,
  width = "",
}) => {
  const [keyboardHeight] = useKeyboard();
  const h: number = useSelector((store: any) => {
    const tHeight = store.generalValues.totalHeight;
    return tHeight;
  });

  const theme = useTheme();
  const customStyles: any = {
    backgroundColor:
      level !== "0" ? theme.colorsx[`color-bg-${level}00`] : undefined,
    //totalhe
    height: undefined,
    //vertial
    justifyContent: undefined,
    alignItems: undefined,
    flex: undefined,
    overflow: "hidden",
    flexDirection: undefined,
    width: undefined,
  };

  if (totalHeight !== -1) {
    if (!isNaN(Number(totalHeight))) {
      customStyles.height = h - Number(totalHeight);
      if (withScroll) {
        customStyles.height += keyboardHeight;
      }
    } else if (`${totalHeight}`.includes("%")) {
      const percent = Number(`${totalHeight}`.replace("%", "")) / 100;
      customStyles.height = h * percent;
      if (withScroll) {
        customStyles.height += keyboardHeight;
      }
    } else if (`${totalHeight}`.includes("px")) {
      const total = Number(`${totalHeight}`.replace("px", ""));
      customStyles.height = total;
    }
  }

  if (verticalCenter) customStyles.justifyContent = "center";
  if (verticalCenter) customStyles.justifyContent = "center";
  if (horizontalCenter) customStyles.alignItems = "center";
  if (flexDirection !== false) customStyles.flexDirection = flexDirection;
  if (flex !== 0) customStyles.flex = flex;
  if (width !== "") customStyles.width = width;
  const nstyles = {
    ...customStyles,
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
    ...utils.objects.cloneObject(style),
  }; //StyleSheet.flatten([customStyles, style && style]);
  return (
    <>
      {withScroll && (
        <ScrollView>
          <Layout style={nstyles}>{children}</Layout>
        </ScrollView>
      )}
      {!withScroll && <Layout style={nstyles}>{children}</Layout>}
    </>
  );
};
export default Panel;
