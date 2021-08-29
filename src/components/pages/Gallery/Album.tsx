import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React, { useEffect, useState, useCallback } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { launchCamera } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/core";
import ImageResizer from "react-native-image-resizer";
import FeedImages, { FeedImageType } from "../../ui/FeedImages/FeedImages";
import utils from "../../../libs/utils/utils";
import Panel from "../../ui/Panel/Panel";
import CTopBack from "../../ui/CTopBack/CTopBack";
import { useAbc } from "../../hooks/useAbc";

const TAG = "ALBUM";
type AlbumProps = {
  callBack: (data: FeedImageType) => void;
};
const Album: React.FC<AlbumProps> = ({ callBack }) => {
  const abc = useAbc().abc.Album;
  const navigation = useNavigation();

  const [dataImages, setDataImages] = useState<Array<FeedImageType>>([]);
  const [mediaCounter, setMediaCounter] = useState(0);
  const [refreshing, setRefreshing] = useState(true);

  const resizeImage = useCallback(
    (image: FeedImageType) => {
      if (image.isVideo) {
        //callBack(image);
        navigation.navigate("Video", {
          screen: "Video",
          params: { image: image },
        });
        return;
      }
      console.log(TAG, "image before resize", image);
      ImageResizer.createResizedImage(image.uri, 640, 640, "JPEG", 90)
        .then((response) => {
          console.log(TAG, response);
          image.uri = response.uri;
          callBack(image);
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
        })
        .catch((err) => {
          console.log(TAG, err);
        });
    },
    [callBack, navigation],
  );

  const refresh = useCallback(() => {
    utils.media
      .getMediaFiles(mediaCounter + 30, resizeImage)
      .then((arrImages) => {
        setRefreshing(false);
        setDataImages(arrImages);
        if (arrImages.length > 0) {
          setMediaCounter(mediaCounter + 10);
        }
      })
      .catch(() => {
        setDataImages([]);
        setRefreshing(false);
      });
  }, [resizeImage, mediaCounter]);

  useEffect(() => {
    if (mediaCounter === 0) {
      refresh();
    }
  }, [callBack, refresh, mediaCounter]);

  const startCamera = useCallback(() => {
    launchCamera(
      {
        mediaType: "photo",
        maxWidth: 520,
        saveToPhotos: false,
      },
      (result) => {
        console.log(TAG, result);

        //let data: any = {}
        if (result.didCancel) {
          return;
        }
        if (!Array.isArray(result.assets)) {
          return;
        }
        if (!(result.assets.length > 0)) {
          return;
        }
        const data = result.assets[0];
        resizeImage({
          key: utils.generateKey("cameraimage"),
          uri: data.uri!,
          type: data.type!,
          timeStamp: utils.dates.dateNowUnix(),
          title: "Camera Picture",
          isVideo: false,
          imageFromCamera: true,
          update: (d: FeedImageType) => null,
          onPress: (d: FeedImageType) => null,
        });
      },
    );
  }, [resizeImage]);

  const cameraButton = (
    <TouchableWithoutFeedback onPress={() => startCamera()}>
      <TopNavigationAction
        icon={(props) => <Icon {...props} name="camera-outline" />}
      />
    </TouchableWithoutFeedback>
  );
  return (
    <Panel level="5" totalHeight={0}>
      <CTopBack
        title={abc.gallery}
        onBackPress={() => navigation.goBack()}
        rightButton={cameraButton}
      />
      <FeedImages
        arrayImages={dataImages}
        isRefresh={refreshing}
        onRefresh={() => refresh()}
      />
    </Panel>
  );
};

export default Album;
