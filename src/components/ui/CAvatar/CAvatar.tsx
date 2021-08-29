import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";

import DogIcon from "./../../Icons/others/DogIcon";
import { useTheme } from "../../hooks/useTheme";
import { useMemo } from "react";

const cicleRadius = 45;
const styles = StyleSheet.create({
  container: {
    width: cicleRadius,
    height: cicleRadius,
    borderRadius: cicleRadius,
    overflow: "hidden",
  },
  totalPanel: { justifyContent: "center" },
  image: {
    width: cicleRadius,
    height: cicleRadius,
  },
});

const TAG = "CUSTOM AVATAR";
type CAvatarProps = {
  urlImage: string;
  style?: any;
  size?: number;
};
const CAvatar: React.FC<CAvatarProps> = ({ urlImage, style, size = 45 }) => {
  const theme = useTheme();
  const [errLoad, setErrLoad] = useState(false);

  const theImage = useMemo(() => {
    if (errLoad) {
      return "";
    }
    if (urlImage !== "" && urlImage.includes("http")) {
      return urlImage;
    }
    return "";
  }, [urlImage, errLoad]);

  const containerStyles = {
    ...styles.container,
    ...style,
    width: size,
    height: size,
    borderRadius: size,
    backgroudColor: theme.colors["color-basic-500"],
  };
  const imageStyles = {
    ...styles.image,
    width: size,
    height: size,
  };
  return (
    <View style={styles.totalPanel}>
      <View style={containerStyles}>
        {theImage !== "" && (
          <FastImage
            style={imageStyles}
            source={{
              uri: urlImage,
              //headers: { Authorization: "someAuthToken" },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoad={(data) => {
              //
            }}
            onError={() => {
              console.error(TAG, "err");
              setErrLoad(true);
            }}
          />
        )}
        {theImage === "" && <DogIcon width={size} height={size} />}
      </View>
    </View>
  );
};
export default CAvatar;
