import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@ui-kitten/components";

import CButton from "../CButton/CButton";
import FormIcon from "../../Icons/Home/FormIcon";
import AddICon from "../../Icons/Home/AddIcon";
import { ChannelsListItem } from "../../pages/Home/HomeModule";
import AppIcon from "../../Icons/AppIcon/AppIcon";
import utils from "../../../libs/utils/utils";
import { useTheme } from "../../hooks/useTheme";

const styles = StyleSheet.create({
  itemBox: {
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
});

const TAG = "LIST CHANNEL ITEM";
type ListChannelItemProps = {
  listItem: ChannelsListItem;
  underline?: boolean;
  onPress: (channelID: ChannelsListItem) => void;
};
const ListChannelItem: React.FC<ListChannelItemProps> = ({
  listItem,
  underline = false,
  onPress,
}) => {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();

  const pressItem = () => {
    onPress(listItem);
  };

  const stylesBox: any = {
    ...styles.itemBox,
    borderBottomWidth: undefined,
    borderBottomColor: undefined,
  };
  if (underline) {
    stylesBox.borderBottomWidth = 3;
    stylesBox.borderBottomColor = theme.colors["color-primary-600"];
  }

  return (
    <View key={utils.generateKey("channelItem")} style={stylesBox}>
      {visible && (
        <>
          {listItem.withIcon && (
            <CButton
              onPress={pressItem}
              imageInsertComponent={() => (
                <>
                  {listItem.module === "access" && (
                    <AppIcon
                      color={theme.colors["color-primary-600"]}
                      width={35}
                      height={35}
                    />
                  )}
                  {listItem.module === "history" && (
                    <FormIcon
                      color={theme.colors["color-primary-600"]}
                      width={35}
                      height={35}
                    />
                  )}
                  {listItem.module === "register" && (
                    <AddICon
                      color={theme.colors["color-primary-600"]}
                      width={35}
                      height={35}
                    />
                  )}
                </>
              )}
            />
          )}
          {!listItem.withIcon && (
            <Button onPress={pressItem} size="medium" appearance="ghost">
              {listItem.channel?.name}
            </Button>
          )}
        </>
      )}
    </View>
  );
};
export default ListChannelItem;
