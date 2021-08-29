import { StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import utils from "../../../libs/utils/utils";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/core";

const styles = StyleSheet.create({ container: {} });

const TAG = "CUSTOM IMAGE";
type CImageProps = {
  style: any;
  urlImage: string;
  withRedimension?: boolean;
  onPress?: () => void;
  withPreview: boolean;
};
const CImage: React.FC<CImageProps> = ({
  style,
  urlImage,
  withRedimension = true,
  onPress,
  withPreview = false,
}) => {
  const navigation = useNavigation();
  const [size, setSize] = useState({
    w: 0,
    h: style.height || 0,
  });
  const imageStyle = useMemo(() => {
    if (!withRedimension) {
      return style;
    } else {
      return {
        ...utils.objects.cloneObject(style),
        width: size.w,
        height: size.h,
        maxWidth: Dimensions.get("screen").width * 0.8,
      };
    }
  }, [withRedimension, size, style]);

  return (
    <>
      <Pressable
        onPress={() => {
          if (withPreview) {
            if (typeof navigation !== "undefined") {
              const parms = { urlImage: urlImage };
              navigation.navigate("ImageViewer", parms);
            }
          }

          onPress ? onPress() : null;
        }}>
        <FastImage
          style={imageStyle}
          source={{
            uri: urlImage,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(evt) => {
            const n = evt.nativeEvent;
            const newWidth = utils.rulethree(
              n.height,
              imageStyle.height,
              n.width,
            );
            if (!withRedimension) {
              setSize({
                h: n.height,
                w: n.width,
              });
              return;
            }
            if (newWidth < imageStyle.maxWidth) {
              setSize({
                ...size,
                w: newWidth,
              });
              return;
            }
            const newHeight = utils.rulethree(
              n.width,
              imageStyle.maxWidth,
              n.height,
            );

            setSize({
              w: imageStyle.maxWidth,
              h: newHeight,
            });
          }}
          onError={() => {
            console.error(TAG, "error to load image");
          }}
        />
      </Pressable>
    </>
  );
};
export default CImage;
