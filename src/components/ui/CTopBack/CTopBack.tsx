import React from "react";
import {
  Text,
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
  TopNavigation,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Panel from "../Panel/Panel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const EditIcon = (props: any) => <Icon {...props} name="edit" />;

const MenuIcon = (props: any) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props: any) => <Icon {...props} name="info" />;

const LogoutIcon = (props: any) => <Icon {...props} name="log-out" />;

//----------------------------------------------------------------------
type CTopBackProps = {
  title: string;
  subtitle?: string;
  onBackPress: () => void;
  rightButton?: JSX.Element;
};
const CTopBack: React.FC<CTopBackProps> = ({
  title = "",
  subtitle = "",
  onBackPress,
  rightButton = <></>,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TouchableWithoutFeedback onPress={toggleMenu}>
      <TopNavigationAction icon={MenuIcon} />
    </TouchableWithoutFeedback>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TouchableWithoutFeedback onPress={onBackPress}>
      <TopNavigationAction icon={BackIcon} />
    </TouchableWithoutFeedback>
  );

  const topProps: any = {
    alignment: "center",
    title: undefined,
    subtitle: undefined,
    accessoryLeft: renderBackAction,
    accessoryRight: () => rightButton,
  };

  if (subtitle !== "") {
    topProps.title = title;
    topProps.subtitle = subtitle;
  } else {
    topProps.title = (props: any) => (
      <Text {...props} style={{ fontSize: 22 }}>
        {title}
      </Text>
    );
  }
  const topNavStyles = { backgroundColor: "transparent" };
  /* accessoryRight={topProps.accessoryRight}*/
  return (
    <Panel style={styles.container} level="5">
      <TopNavigation
        style={topNavStyles}
        title={topProps.title}
        subtitle={topProps.subtitle}
        accessoryLeft={topProps.accessoryLeft}
        accessoryRight={topProps.accessoryRight}
      />
    </Panel>
  );
};

export default CTopBack;
