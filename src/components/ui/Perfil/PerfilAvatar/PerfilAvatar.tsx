import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import DogIcon from "../../../Icons/others/DogIcon";
import CImage from "../../CImage/CImage";
import utils from "../../../../libs/utils/utils";
import CButton from "../../../ui/CButton/CButton";
import CameraIcon from "../../../Icons/others/CameraICon";

import { FeedImageType } from "../../FeedImages/FeedImages";
import { InvokeGallery } from "../../../pages/Gallery/GalleryModule";
import { useTheme } from "../../../hooks/useTheme";
import IdCardIcon from "../../../Icons/UsersAccess/IdCardIcon";
import CText from "../../CText/CText";
import Panel from "../../Panel/Panel";

const imageLateralSize = 120;
const styles = StyleSheet.create({
  container: {
    width: imageLateralSize,
    height: imageLateralSize,
    borderRadius: 200,
    overflow: "hidden",
  },
  image: {
    width: imageLateralSize,
    height: imageLateralSize,
  },
  button: {},
  panelButton: {
    position: "absolute",
    backgroundColor: "green",
    borderRadius: 50,
    bottom: 0,
  },
});
const TAG = "PERFIL AVATAR";
type PerfilAvatarProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  imageUri?: string;
  changeButtonEnabled?: boolean;
  imageReference?: "idCard" | "user";
  onSelect?: (data: FeedImageType) => void;
};
const PerfilAvatar: React.FC<PerfilAvatarProps> = ({
  style,
  title = "",
  imageUri = "",
  changeButtonEnabled = false,
  imageReference = "user",
  onSelect = (data: any) => null,
}) => {
  const theme = useTheme();

  const goGallery = InvokeGallery((data) => {
    onSelect(data);
  });
  const panelStyle = { ...utils.objects.cloneObject(style) };
  const panelButtonStyles = {
    ...styles.panelButton,
    backgroundColor: theme.colors["color-primary-500"],
  };
  const imageContainerStyles = {
    ...styles.container,
    borderRadius: imageReference === "user" ? 200 : 10,
  };
  return (
    <View>
      <View style={panelStyle}>
        {imageUri === "" && (
          <View style={imageContainerStyles}>
            {imageReference === "user" && (
              <DogIcon width={imageLateralSize} height={imageLateralSize} />
            )}
            {imageReference === "idCard" && (
              <IdCardIcon
                color={theme.colors["color-primary-700"]}
                width={imageLateralSize}
                height={imageLateralSize}
              />
            )}
          </View>
        )}
        {imageUri !== "" && (
          <View style={styles.container}>
            <CImage
              withRedimension={false}
              style={styles.image}
              urlImage={imageUri}
              withPreview={true}
            />
          </View>
        )}
        {changeButtonEnabled && (
          <View style={panelButtonStyles}>
            <CButton
              style={styles.button}
              imageInsertComponent={() => (
                <CameraIcon
                  color={theme.colors["color-primary-100"]}
                  width={25}
                  height={25}
                />
              )}
              onPress={goGallery}
            />
          </View>
        )}
      </View>
      <Panel horizontalCenter={true} width={120}>
        {title !== "" && <CText category="p1">{title}</CText>}
      </Panel>
    </View>
  );
};
export default PerfilAvatar;
