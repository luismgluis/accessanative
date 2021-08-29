import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import CTopBack from "../CTopBack/CTopBack";
import ImageViewerLib from "react-native-image-zoom-viewer";
import { useTheme } from "../../hooks/useTheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: 200,
  },
});

const TAG = "IMAGE VIEWER";
type ImageViewerProps = {
  navigation: any;
  route: any;
};
const ImageViewer: React.FC<ImageViewerProps> = ({ navigation, route }) => {
  const theme = useTheme();
  let imageUrl = "";
  if (typeof route.params !== "undefined") {
    if (typeof route.params.urlImage !== "undefined") {
      imageUrl = route.params.urlImage;
    }
  }
  //"https://firebasestorage.googleapis.com/v0/b/apoyorescate.appspot.com/o/test%2Fmiguel.png?alt=media&token=663cddcb-b9c2-42b3-9f29-9d5190006ae3",
  const images = [{ url: imageUrl }];
  const panelImageStyles = {
    ...styles.container,
    backgroundColor: theme.colors["color-info-900"],
    //width: Dimensions.get("screen").width,
  };
  return (
    <Panel totalHeight={0}>
      <CTopBack title="" onBackPress={() => navigation.goBack()} />
      <View style={panelImageStyles}>
        <ImageViewerLib
          backgroundColor={theme.colors["color-info-900"]}
          imageUrls={images}
        />
      </View>
    </Panel>
  );
};
export default ImageViewer;
