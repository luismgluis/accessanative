import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import Panel from "../Panel/Panel";
import UsersAccessTopSearch from "./UsersAccessTopSearch";
import UsersAccessBottomInfo from "./UsersAccessBottomInfo";
import { ResidentType } from "./../../../libs/types/ResidentType";

const styles = StyleSheet.create({
  container: {},
  title: { paddingTop: 20 },
  panelOptions: {
    flexDirection: "row",
    width: "100%",
  },
  panelOptionsButton: {
    flex: 1,
    backgroundColor: "red",
    height: 50,
    alignItems: "center",
  },
});

const TAG = "USERS ACCESS";
type UsersAccessProps = {
  pagerFocus?: boolean;
};
const UsersAccess: React.FC<UsersAccessProps> = ({ pagerFocus }) => {
  const [currentUser, setCurrentUser] = useState(new ResidentType("", null));
  const onClean = useCallback(() => {
    setCurrentUser(new ResidentType("", null));
  }, []);

  return (
    <Panel level="5" style={styles.container}>
      {pagerFocus && (
        <UsersAccessTopSearch
          onResult={(u) => {
            if (u === null) {
              setCurrentUser(new ResidentType("", null));
              return;
            }
            setCurrentUser(u);
          }}
        />
      )}
      <Panel style={styles.panelOptions} level="5" totalHeight="45%">
        {!currentUser.isEmpty() && (
          <UsersAccessBottomInfo onClean={onClean} userResident={currentUser} />
        )}
      </Panel>
    </Panel>
  );
};
export default UsersAccess;
