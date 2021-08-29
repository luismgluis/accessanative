import { StyleSheet, View, TextInput } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "@ui-kitten/components";
import SearchIcon from "../../../Icons/UsersAccess/SearchIcon";
import { ResidentType } from "../../../../libs/types/ResidentType";
import UserAccessSearchModule from "../UserAccessSearch/UserAccessSearchModule";
import CButton from "../../../ui/CButton/CButton";
import {
  CAlertEmpty,
  CAlertInfo,
  CAlertLoading,
} from "../../CAlert/CAlertNotification";
import CloseIcon from "../../../Icons/others/CloseIcon";
import UsersInfoListItem from "../../UsersInfo/UsersInfoListItem";
import Panel from "../../Panel/Panel";
import utils from "../../../../libs/utils/utils";
import { useTheme } from "../../../hooks/useTheme";
import CText from "../../CText/CText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  panelInput: {
    width: "100%",
    alignItems: "center",
  },
  panelInput2: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  panelInputIcon: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  input: {
    width: "60%",
    fontSize: 28,
    textAlign: "center",
    color: "blue",
  },
  panelList: { width: "100%" },
});

const TAG = "USER ACCESS SEARCH";
const module = new UserAccessSearchModule();

type UserAccessSearchProps = {
  onResult?: (data: ResidentType | null) => void;
  inputType: "idCard" | "sector" | "vehicle";
};

const UserAccessSearch: React.FC<UserAccessSearchProps> = ({
  onResult = () => null,
  inputType,
}) => {
  const theme = useTheme();

  const inputInfoProps = useMemo<any>(() => {
    const info = {
      placeholder: "",
      keyboardType: "",
    };
    if (inputType === "idCard") {
      info.placeholder = "1223334444";
      info.keyboardType = "numeric";
    } else if (inputType === "vehicle") {
      info.placeholder = "ABC123";
      info.keyboardType = "default";
    } else {
      info.placeholder = "A123";
      info.keyboardType = "default";
    }
    return info;
  }, [inputType]);

  const [valueToSearch, setValueToSearch] = useState("");
  const inputStyles = {
    ...styles.input,
    color: theme.colors["color-primary-700"],
    borderBottomColor: theme.colors["color-primary-400"],
  };
  const panelInput2Styles = {
    ...styles.panelInput2,
    borderBottomColor: theme.colors["color-primary-400"],
  };

  const selectUserInSector = useCallback(
    (users: ResidentType[]) => {
      console.log(TAG, users);
      const onPress = (resi: ResidentType) => {
        alert.close();
        onResult(resi);
      };
      const elements = users.map((user) => (
        <UsersInfoListItem
          key={utils.generateKey(`UIL${user.id}`)}
          onPress={onPress}
          resident={user}
        />
      ));

      const alert = CAlertEmpty(
        <Panel style={styles.panelList} totalHeight="80%">
          <Panel horizontalCenter={true} paddingVertical={20}>
            <Text category="h4">Select an user</Text>
            <Text category="h6">
              These users are registered in sector {users[0].sector}
            </Text>
          </Panel>
          {elements}
        </Panel>,
        null,
        true,
      );
    },
    [onResult],
  );

  const [recents, setRecents] = useState<string[]>([]);

  const search = useCallback(
    (customValueToSearch = "") => {
      const valueSearch =
        customValueToSearch !== "" ? customValueToSearch : valueToSearch;

      const loadingAlert = CAlertLoading("Searching..");
      let minTime = false;
      utils.timeOut(700).then(() => (minTime = true));
      if (inputType === "idCard") {
        const onGetUser = (res: any) => {
          if (res == null) {
            CAlertInfo("Search fail", "No results found");
            return;
          }
          loadingAlert.close();
          onResult(res);
        };
        module
          .getUsersByIdCard(valueSearch.toUpperCase())
          .then((res) => {
            console.log(TAG, res);
            if (minTime) onGetUser(res);
            if (!minTime) utils.timeOut(700).then(() => onGetUser(res));
          })
          .catch((err) => {
            console.log(TAG, err);
            if (minTime) onGetUser(null);
            if (!minTime) utils.timeOut(700).then(() => onGetUser(null));
          });
      } else if (inputType === "sector") {
        const onGetUsers = (users: ResidentType[]) => {
          loadingAlert.close();
          if (users !== null) {
            if (users.length > 0) {
              selectUserInSector(users);
              return;
            }
          }
          CAlertInfo(
            "Search failed",
            users == null ? "search failed, try again" : "No results found",
          );
        };

        module
          .getUsersBySector(valueSearch.toUpperCase())
          .then((users) => {
            module.addSectorRecents(valueSearch);
            setRecents([]);
            console.log(TAG, minTime, "getUsersBySector");
            if (minTime) onGetUsers(users);
            if (!minTime) utils.timeOut(700).then(() => onGetUsers(users));
          })
          .catch((err) => {
            console.log(TAG, "getUsersBySector err", minTime, err);
            if (minTime) onGetUsers(err);
            if (!minTime) utils.timeOut(700).then(() => onGetUsers(err));
          });
      } else if (inputType === "vehicle") {
        const onGetUsers = (users: ResidentType[]) => {
          loadingAlert.close();
          if (users !== null) {
            if (users.length > 0) {
              selectUserInSector(users);
              return;
            }
          }
          CAlertInfo(
            "Search failed",
            users == null ? "search failed, try again" : "No results found",
          );
        };

        module
          .getUsersByVehicle(valueSearch.toUpperCase())
          .then((user) => {
            if (minTime) onGetUsers([user]);
            if (!minTime) utils.timeOut(700).then(() => onGetUsers([user]));
          })
          .catch((err) => {
            console.log(TAG, "getUsersBySector err", minTime, err);
            if (minTime) onGetUsers(err);
            if (!minTime) utils.timeOut(700).then(() => onGetUsers(err));
          });
      }
    },
    [valueToSearch, onResult, inputType, selectUserInSector],
  );

  useEffect(() => {
    if (recents.length === 0 && inputType === "sector")
      module.getSectorRecents().then((res) => setRecents(res));
  }, [recents, inputType]);

  const recentsJsx = useMemo(() => {
    const arr = recents.map((item) => (
      <View key={utils.generateKey(`RECENTBUTTONS${item}`)}>
        <CButton
          text={item}
          appeareance="ghost"
          onPress={() => {
            setValueToSearch(item);
            search(item);
          }}
        />
      </View>
    ));

    console.log(TAG, recents, arr);
    return arr;
  }, [recents, search]);
  return (
    <View style={styles.container}>
      <View style={styles.panelInput}>
        <View style={panelInput2Styles}>
          <View style={styles.panelInputIcon}>
            {valueToSearch !== "" && (
              <CButton
                onPress={() => {
                  setValueToSearch("");
                  onResult(null);
                }}
                imageInsertComponent={() => (
                  <CloseIcon
                    width={25}
                    height={25}
                    color={theme.colors["color-primary-400"]}
                  />
                )}
              />
            )}
          </View>
          <TextInput
            style={inputStyles}
            value={valueToSearch}
            placeholderTextColor={theme.colors["color-basic-600"]}
            onChangeText={(t) => {
              setValueToSearch(t);
              onResult(null);
            }}
            onSubmitEditing={() => search()}
            {...inputInfoProps}
          />
          <View style={styles.panelInputIcon}>
            <CButton
              onPress={() => search()}
              imageInsertComponent={() => (
                <SearchIcon
                  width={30}
                  height={30}
                  color={theme.colors["color-primary-400"]}
                  colorTwo={theme.colors["color-primary-600"]}
                />
              )}
            />
          </View>
        </View>
        {valueToSearch !== "" && (
          <CText category="label">Pulsa la X para cancelar.</CText>
        )}
      </View>
      <Panel flexDirection="row" totalHeight="50px">
        {recentsJsx}
      </Panel>
    </View>
  );
};
export default UserAccessSearch;
