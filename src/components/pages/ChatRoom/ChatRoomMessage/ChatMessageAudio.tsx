import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useState } from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import CButton from "../../../ui/CButton/CButton";
import PlayIcon from "../../../Icons/ChatRoom/PlayIcon";
import { Spinner } from "@ui-kitten/components";
import PauseIcon from "../../../Icons/ChatRoom/PauseIcon";
import api from "../../../../libs/api/api";
import playerSounds from "../../../../libs/utils/playerSounds";
import utils from "../../../../libs/utils/utils";
import { useTheme } from "../../../hooks/useTheme";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 12,
    height: 50,
    width: 200,
    overflow: "hidden",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  panelButton: { width: 40 },
  panelBar: {
    paddingTop: 21,
    paddingHorizontal: 5,
    height: 50,
    flex: 1,
  },
  bar: {
    backgroundColor: "red",
    height: 5,
    width: "100%",
  },
  text: {
    color: "red",
    textAlign: "right",
    width: "100%",
  },
  panelSpinner: { padding: 10 },
  spinner: {},
  progress: {
    backgroundColor: "red",
    width: "100%",
    height: 5,
  },
});

const ViewAnimated = Animated.createAnimatedComponent(View);
type ChatMessageAudioBarProps = {
  playing: boolean;
  isme: boolean;
  time: number;
};
const ChatMessageAudioBar: React.FC<ChatMessageAudioBarProps> = ({
  playing,
  isme,
  time,
}) => {
  const theme = useTheme();
  const initAnim = React.useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const [timeShowed, setTimeShowed] = useState("00:00");

  React.useEffect(() => {
    setTimeShowed(utils.dates.secsToTime(time));
    if (!playing) {
      return;
    }
    const anim = (toVal: number, timeEnd: number) => {
      Animated.timing(initAnim, {
        toValue: toVal,
        duration: timeEnd,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => {
        //
        if (toVal === 1) {
          anim(0, 50);
          //initAnim.setValue(0);
        }
      });
    };
    anim(1, time);
    initAnim.addListener((data) => {
      const percent = parseInt("" + Number(data.value) * time, 10);
      setTimeShowed(utils.dates.secsToTime(time - percent));
      //return;
      if (!isNaN(data.value)) {
        setWidth(data.value * 100);
      }
    });
    return () => {
      initAnim.setValue(0);
    };
  }, [playing, initAnim, time, setWidth]);

  const barStyles = {
    ...styles.bar,
    backgroundColor: !isme
      ? theme.colors["color-info-300"]
      : theme.colors["color-basic-500"],
  };
  const progressStyles = {
    ...styles.progress,
    width: (playing ? width : "0") + "%",
    backgroundColor: !isme
      ? theme.colors["color-primary-900"]
      : theme.colors["color-primary-900"],
  };
  const panelBarStyles = { ...styles.panelBar };
  const textStyles = {
    ...styles.text,
    color: !isme
      ? theme.colors["color-basic-800"]
      : theme.colors["color-basic-100"],
  };

  return (
    <View style={panelBarStyles}>
      <View style={barStyles}>
        <ViewAnimated style={progressStyles} />
      </View>
      <Text style={textStyles}>{timeShowed}</Text>
    </View>
  );
};

const TAG = "CHAT MESSAGE AUDIO";
type ChatMessageAudioProps = {
  msj: RoomMessageType;
  isme: boolean;
};

const ChatMessageAudio: React.FC<ChatMessageAudioProps> = ({ msj, isme }) => {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);

  const [pathLocalFile, setPathLocalFile] = useState("");
  const player = React.useMemo(() => {
    const play = new playerSounds("");
    play.onPlay = () => {
      setPlaying(true);
    };
    play.onStop = () => {
      setPlaying(false);
    };
    return play;
  }, [setPlaying]);

  const onPress = () => {
    if (playing) {
      player.stop();
      return;
    }
    player.play();
  };
  const containerStyles = {
    ...styles.container,
    // backgroundColor: isme
    //   ? theme.colors["color-primary-700"]
    //   : theme.colors["color-primary-700"],
  };
  const baseColor = !isme
    ? theme.colors["color-primary-800"]
    : theme.colors["color-basic-100"];
  const panelButtonStyles = { ...styles.panelButton };

  const spinnerStyles = { ...styles.spinner };

  useEffect(() => {
    if (msj.fileUpload) {
      api
        .downLoadFile(msj.fileUrl!)
        .then((path) => {
          player.setPath(path);
          setPathLocalFile(path);
        })
        .catch((err) => {
          console.error(TAG, "fail to get local file audio", err);
        });
    }
    return () => player.stop();
  }, [setPathLocalFile, msj, player]);
  return (
    <View style={containerStyles}>
      <View style={panelButtonStyles}>
        {pathLocalFile === "" && (
          <View style={styles.panelSpinner}>
            <Spinner style={spinnerStyles} status="info" />
          </View>
        )}
        {pathLocalFile !== "" && (
          <CButton
            imageInsertComponent={() => (
              <>
                {!playing && (
                  <PlayIcon color={baseColor} width={25} height={25} />
                )}
                {playing && (
                  <PauseIcon color={baseColor} width={25} height={25} />
                )}
              </>
            )}
            onPress={onPress}
          />
        )}
      </View>
      <ChatMessageAudioBar playing={playing} isme={isme} time={msj.fileTime!} />
    </View>
  );
};
export default ChatMessageAudio;
