import {
  StyleSheet,
  View,
  Text,
  ViewProps,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CButton from "../../../ui/CButton/CButton";

import MicrophoneIcon from "../../../Icons/ChatRoom/MicrophoneIcon";
import RecordIcon from "../../../Icons/ChatRoom/RecordIcon";
import { Portal } from "react-native-portalize";

import RoomMessageType from "../../../../libs/types/RoomMessageType";
import api from "../../../../libs/api/api";
import { stat } from "react-native-fs";

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from "react-native-audio-recorder-player";
import permissions from "../../../../libs/utils/permissions";
import utils from "../../../../libs/utils/utils";
import Panel from "../../../ui/Panel/Panel";
import { useTheme } from "../../../hooks/useTheme";
const styles = StyleSheet.create({
  container: {},
  bubble: {
    zIndex: 2,
    width: 150,
    height: 50,
    position: "absolute",
    padding: 5,
    right: 0,
    bottom: 50,
    borderTopLeftRadius: 20,
  },
  test: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "relative",
    zIndex: 2,
    marginTop: -48,
    backgroundColor: "red",
  },
  counterPanel: {
    flexDirection: "row",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
  },
  counter: { fontSize: 30 },
});

interface AudioSet {
  AVSampleRateKeyIOS?: number;
  AVFormatIDKeyIOS?: any;
  AVNumberOfChannelsKeyIOS?: number;
  AVEncoderAudioQualityKeyIOS?: AVEncoderAudioQualityIOSType;
  AudioSourceAndroid?: AudioSourceAndroidType;
  OutputFormatAndroid?: OutputFormatAndroidType;
  AudioEncoderAndroid?: AudioEncoderAndroidType;
}

const TAG = "BUTTON CLIP";
export interface CRBBButtonClipProps extends ViewProps {
  cstyles?: any;
  onSend: (msj: RoomMessageType) => void;
}
type generalType = {
  timer: null | NodeJS.Timeout;
  timerCounter: number;
  timerSecs: number;
  audioRecorderPlayer: AudioRecorderPlayer;
  audioPath: string;
  audioSize: number;
};
const generals: generalType = {
  timer: null,
  timerCounter: 0,
  timerSecs: 0,
  audioRecorderPlayer: new AudioRecorderPlayer(),
  audioPath: "",
  audioSize: 0,
};
const CRBBButtonMicrophone: React.FC<CRBBButtonClipProps> = ({
  cstyles,
  onSend,
}) => {
  const theme = useTheme();
  const [textCounter, setTextCounter] = useState("");
  const [isRecord, setIsRecord] = useState(false);
  const [message, setMessage] = useState<RoomMessageType>(
    new RoomMessageType("", { creator: api.users.currentUser.id }),
  );
  const [audioRecord, setAudioRecord] = useState({
    recordMillSecs: 0,
    recordTime: "",
  });
  const send = () => {
    if (audioRecord.recordMillSecs < 1000) {
      return;
    }
    message.setMessageID(utils.generateKey("ID"));
    message.setFileUpload(false);
    message.setAudio(
      generals.audioPath,
      generals.audioSize,
      audioRecord.recordMillSecs,
    );

    onSend(message);
    setMessage(new RoomMessageType("", { creator: api.users.currentUser.id }));
    generals.audioPath = "";
    generals.audioSize = 0;
  };
  const resetCounter = (stop = false) => {
    const stopp = () => {
      try {
        clearInterval(parseInt(`${generals.timer}`));
      } catch (error) {}
      generals.timer = null;
      generals.timerCounter = 0;
      generals.timerSecs = 0;
      //send();
    };
    if (stop) {
      stopp();
      return;
    }
    if (generals.timer === null) {
      generals.timer = setInterval(() => {
        generals.timerCounter++;
        let mins = 0;
        let secs = generals.timerSecs;
        const msec = generals.timerCounter;
        if (generals.timerCounter === 9) {
          generals.timerCounter = 0;
          generals.timerSecs++;
          secs = generals.timerSecs;
        }

        if (generals.timerSecs > 59) {
          mins = parseInt("" + generals.timerSecs / 60, 10);
          secs = generals.timerSecs - mins * 60;
        }

        setTextCounter(
          `${mins > 9 ? mins : "0" + mins}:${
            secs > 9 ? secs : "0" + secs
          },${msec}`,
        );
      }, 100);
      return;
    }
    stopp();
  };
  const touchStart = () => {
    resetCounter();
    setIsRecord(true);
    startRecord();
  };
  const touchEnd = () => {
    setIsRecord(false);
    resetCounter(true);
    stopRecord();
  };
  const audioRecorderPlayer = generals.audioRecorderPlayer;
  const startRecord = async () => {
    const hasPermission = await permissions.checkPermission(
      permissions.permissionsTypes.AUDIO,
    );
    if (hasPermission) {
      const hasWrite = await permissions.checkPermission(
        permissions.permissionsTypes.WRITE,
      );
      if (!hasWrite) {
        await permissions.requestWriteFilesPermission();

        return;
      }
    }
    if (!hasPermission) {
      await permissions.requestAudioPermission();

      return;
    }
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;

    const record = (path: string) => {
      generals.audioPath = path;
      audioRecorderPlayer
        .startRecorder(path, audioSet, meteringEnabled)
        .then((dataUri) => {
          audioRecorderPlayer.addRecordBackListener((e: any) => {
            setAudioRecord({
              recordMillSecs: e.current_position,
              recordTime: audioRecorderPlayer.mmssss(
                Math.floor(e.current_position),
              ),
            });
          });
        });
    };

    const fileName = Platform.select({
      ios: "record.m4a",
      android: "record.mp4", // should give extra dir name in android. Won't grant permission to the first level of dir.
    });

    utils.createFile("media/records", `${fileName}`).then((data) => {
      record(data.path);
    });
  };
  const stopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    const statResult = await stat(generals.audioPath);
    generals.audioSize = Number(statResult.size);
    setAudioRecord({
      recordMillSecs: 0,
      recordTime: "",
    });
    send();
  };
  const pressStyles = {
    width: 40,
    height: 40,
  };
  const counterStyles = {
    ...styles.counter,
    color: theme.colors["color-primary-500"],
  };
  return (
    <View style={cstyles}>
      {isRecord && (
        <Portal>
          <Panel level="7" style={styles.bubble}>
            <View style={styles.counterPanel}>
              <CButton
                imageInsertComponent={() => (
                  <RecordIcon width={35} height={35} />
                )}
              />
              <Text style={counterStyles}>{textCounter}</Text>
            </View>
          </Panel>
        </Portal>
      )}
      <Pressable
        style={pressStyles}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}>
        <CButton
          imageInsertComponent={() => (
            <MicrophoneIcon
              color={theme.colors["color-primary-500"]}
              width={30}
              height={30}
            />
          )}
        />
      </Pressable>
    </View>
  );
};
export default CRBBButtonMicrophone;
