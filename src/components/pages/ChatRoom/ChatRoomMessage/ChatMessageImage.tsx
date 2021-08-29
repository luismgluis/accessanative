import { Dimensions, View, Text } from "react-native";
import React, { useMemo } from "react";
import styles from "./ChatMessageStyles";
import CImage from "../../../ui/CImage/CImage";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import api from "../../../../libs/api/api";
import utils from "../../../../libs/utils/utils";
//const styles = StyleSheet.create({ container: {} });

const TAG = "CHAT MESSAGE IMAGE";
type ChatMessageImageProps = {
  msj: RoomMessageType;
  isme: boolean;
};
const ChatMessageImage: React.FC<ChatMessageImageProps> = ({ msj }) => {
  let panelImageStyles = {
    ...styles.panelImage,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  };
  const isme: boolean = msj.creator === api.users.currentUser.id;
  const size = useMemo(() => {
    const screenSize = {
      h: (Dimensions.get("screen").height / 10) * 4 + 50,
      w: Dimensions.get("screen").width * 0.75,
    };
    const arr = msj.fileDimensions!.split("x");
    const imageSize = {
      w: Number(arr[0]),
      h: Number(arr[1]),
    };

    if (arr.length < 1) {
      return screenSize;
    }
    const newsize = (() => {
      if (imageSize.h > imageSize.w) {
        return {
          w: utils.rulethree(imageSize.h, screenSize.h, imageSize.w),
          h: screenSize.h,
        };
      }
      return {
        w: screenSize.w,
        h: utils.rulethree(imageSize.w, screenSize.w, imageSize.h),
      };
    })();

    return newsize;
  }, [msj]);

  if (isme) {
    panelImageStyles = {
      ...panelImageStyles,
      ...styles.mePanelBorder,
    };
  } else {
    panelImageStyles = {
      ...panelImageStyles,
      ...styles.otherPanelborder,
    };
  }
  const imageStyles = {
    ...styles.image,
    maxwidth: Dimensions.get("screen").width * 0.75,
    minwidth: size.w,
    height: size.h, //(Dimensions.get("screen").height / 10) * 4 + 50,
    width: size.w, //Dimensions.get("screen").width * 0.8,
  };

  return (
    <View style={panelImageStyles}>
      <CImage
        withRedimension={true}
        style={imageStyles}
        urlImage={msj.fileUrl!}
        withPreview={true}
      />
    </View>
  );
};
export default ChatMessageImage;
