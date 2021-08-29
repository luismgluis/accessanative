import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import {
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import MenuIcon from "../../Icons/Home/MenuIcon";
import Panel from "../../ui/Panel/Panel";
import { useTheme } from "./../../hooks/useTheme";
import { useNavigatorGoTo } from "../../hooks/useNavigatorGoTo";
import { useAbc } from "../../hooks/useAbc";
import { useLogOut } from "../../hooks/useLogOut";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    padding: 5,
  },
  panelRight: {
    // backgroundColor: "red",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 5,
    // flexDirection: "row-reverse",
  },
  titlePanel: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: { textAlign: "center" },
  panelGroupName: {
    justifyContent: "center",
    height: "100%",
  },
  paper: {
    flex: 12,
    flexDirection: "column",
  },
});

const TAG = "HOME TOP BAR";
type HomeTopBarProps = {
  //
};
const HomeTopBar: React.FC<HomeTopBarProps> = (props) => {
  const abc = useAbc().abc.HomeTopBar;
  const theme = useTheme();
  const group = useCurrentGroup();
  const logOut = useLogOut();
  const groupName = group.name !== "" ? " - " + group.name : "";
  const [menuVisible, setMenuVisible] = React.useState(false);
  const goTo = useNavigatorGoTo(() => {
    setMenuVisible(false);
  });
  const onPress = () => {
    //
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = (props: any) => {
    return (
      <TopNavigationAction
        icon={(props) => (
          <MenuIcon
            color={theme.colors["color-primary-500"]}
            width={20}
            height={20}
          />
        )}
        onPress={toggleMenu}
      />
    );
  };

  return (
    <Panel style={styles.titleContainer} level="5">
      <View style={styles.titlePanel}>
        <Text style={styles.titleText} category="h3">
          {abc.accessa}
        </Text>
        <Pressable style={styles.panelGroupName} onPress={onPress}>
          <Text category="h6">{groupName}</Text>
        </Pressable>
      </View>
      <View style={styles.panelRight}>
        <View>
          <OverflowMenu
            anchor={renderMenuAction}
            visible={menuVisible}
            onBackdropPress={toggleMenu}>
            <MenuItem
              accessoryLeft={(props) => (
                <Icon {...props} name="person-outline" />
              )}
              title={abc.profile}
              onPress={() => goTo.profile()}
            />
            <MenuItem
              accessoryLeft={(props) => <Icon {...props} name="bell-outline" />}
              title={abc.masiveMessage}
              onPress={() => goTo.masiveMessage("Mensaje masivo", true)}
            />
            {/* <MenuItem
              accessoryLeft={(props) => (
                <Icon {...props} name="people-outline" />
              )}
              title={abc.myGroups}
              onPress={() => goTo.myGroups()}
            />
            <MenuItem
              accessoryLeft={(props) => (
                <Icon {...props} name="message-square-outline" />
              )}
              title={abc.channels}
              onPress={() => goTo.channels()}
            /> */}
            <MenuItem
              accessoryLeft={(props) => <Icon {...props} name="npm-outline" />}
              title={abc.logOut}
              onPress={() => logOut()}
            />
          </OverflowMenu>
        </View>
      </View>
    </Panel>
  );
};
export default HomeTopBar;
