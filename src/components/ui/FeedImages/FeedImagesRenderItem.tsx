import { Text } from "@ui-kitten/components";
import React from "react";
import { Image, Pressable, View, StyleSheet, Dimensions } from "react-native";
import { ProcessingManager } from "../../../libs/modules/VideoProcessing/VideoProcessing";
import utils from "../../../libs/utils/utils";
import PlayIcon from "../../Icons/ChatRoom/PlayIcon";
import { FeedImageType } from "./FeedImages";

const win = Dimensions.get("window");

const marginXbox = 5;
const styles = StyleSheet.create({
  box: {
    backgroundColor: "gray",
    width: win.width / 3 - marginXbox - 2,
    height: win.width / 3,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: marginXbox,
    marginRight: marginXbox,
  },
  boxImage: {
    flex: 1,
    width: win.width / 3,
    height: win.width / 3,
  },
  boxTitle: {
    fontSize: 12,
    position: "absolute",
    bottom: 0,
    color: "#ffffff75",
    width: "100%",
    backgroundColor: "#0000005e",
    paddingHorizontal: 5,
  },
  panelVideo: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 12,
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#00000094",
    flexDirection: "row",
  },
  panelVideoIcon: { paddingTop: 2 },
  panelVideoText: {
    fontSize: 12,
    paddingLeft: 3,
  },
});

const TAG = "FEED IMAGES RENDER ITEM :";
type FeedImagesRenderItemProps = {
  data: FeedImageType;
  theme: any;
};
type FeedImagesRenderItemState = {
  isVideo: boolean;
  fileDimensions: string;
  fileDuration: number;
};

class FeedImagesRenderItem extends React.PureComponent<
  FeedImagesRenderItemProps,
  FeedImagesRenderItemState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVideo: false,
      fileDimensions: "",
      fileDuration: 0,
    };
  }
  componentDidMount(): void {
    const data = this.props.data;
    const isVideo = this.isVideo(data);

    if (isVideo) {
      this.getVideoInfo(data);
    } else {
      this.getImageInfo(data);
    }
  }
  getImageInfo(data: FeedImageType): void {
    const that = this;
    utils.media
      .getImageSize(data.uri)
      .then((val) => {
        const dim = `${val.width}x${val.height}`;
        that.setState({ fileDimensions: dim });
      })
      .catch(() => {
        console.error(TAG, data.uri, "Load dimensions failed");
      });
  }
  getVideoInfo(data: FeedImageType): void {
    const that = this;
    //return;
    try {
      ProcessingManager.getVideoInfo(data.uri).then(
        ({ duration, size, frameRate, bitrate }) => {
          if (isNaN(duration)) {
            return;
          }
          that.setState({ fileDuration: duration * 1000 });
        },
      );
    } catch (error) {
      console.error(TAG, "Failed getVideoInfo", error);
    }
  }
  isVideo(data: FeedImageType): boolean {
    if (data.type.includes("video")) {
      this.setState({ isVideo: true });
      return true;
    }
    return false;
  }
  onPress(data: FeedImageType): void {
    const state = this.state;
    const newData: FeedImageType = utils.objects.cloneObject(data);
    newData.duration = state.fileDuration;
    newData.dimensions = state.fileDimensions;
    newData.isVideo = state.isVideo;
    data.onPress(newData);
  }
  getTime(): string {
    if (this.state.isVideo) {
      return utils.dates.secsToTime(this.state.fileDuration);
    }
    return "";
  }
  render(): JSX.Element {
    const that = this;
    const { data, theme } = this.props;
    const time = this.getTime();
    const panelVideoTextStyles = {
      ...styles.panelVideoText,
      color: theme.colors["color-info-100"],
    };
    return (
      <Pressable onPress={() => this.onPress(data)}>
        <View style={styles.box}>
          <Image
            style={styles.boxImage}
            source={{ uri: data.uri }}
            onLoad={(res) => {
              /**/
            }}
            onError={({ nativeEvent: { error } }) => {
              console.error(TAG, "onErrorImage", error);
            }}
          />
          {this.state.isVideo && (
            <View style={styles.panelVideo}>
              <View style={styles.panelVideoIcon}>
                <PlayIcon
                  color={theme.colors["color-info-100"]}
                  width={13}
                  height={13}
                />
              </View>
              <Text style={panelVideoTextStyles}>{time}</Text>
            </View>
          )}
          <Text category="s1" style={styles.boxTitle}>
            {data.title}
          </Text>
        </View>
      </Pressable>
    );
  }
}
export default FeedImagesRenderItem;
