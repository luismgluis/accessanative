import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useCallback, useState } from "react";
import Panel from "../Panel/Panel";
import { Text, Toggle } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";
import api from "../../../libs/api/api";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import GroupType from "../../../libs/types/GroupType";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAbc } from "../../hooks/useAbc";

const styles = StyleSheet.create({ container: {} });

const TAG = "CREATE GROUP";

type CreateGroupProps = {
  style?: StyleProp<ViewStyle>;
  callBack: (data: GroupType | null) => void;
};
const CreateGroup: React.FC<CreateGroupProps> = ({ style, callBack }) => {
  const abc = useAbc().abc.CreateGroup;
  const me = useCurrentUser();
  const [form, setForm] = useState({
    name: "",
    at: "",
    public: true,
  });
  const [loading, setLoading] = useState(false);
  const onCreate = useCallback(() => {
    setLoading(true);
    const newGroup = new GroupType("", {
      at: form.at.toLowerCase().replace(" ", ""),
      name: form.name,
      public: true,
      creationDate: 0,
      id: "",
      creator: me.id,
    });
    api.group
      .createGroup(newGroup, me)
      .then((res) => {
        setLoading(false);
        callBack(res);
      })
      .catch((err) => {
        console.error(TAG, "err", err);
        setLoading(false);
      });
  }, [form, callBack, me]);
  return (
    <Panel verticalCenter={true} horizontalCenter={true} paddingHorizontal={50}>
      <Panel paddingVertical={15}>
        <Text category="h3">{abc.createNewGroup}</Text>
        <Text category="h6">{abc.fillGroupInfo}</Text>
      </Panel>
      <CInput
        value={form.name}
        onChangeText={(t) =>
          setForm({
            ...form,
            name: t,
          })
        }
        placeholder={abc.namePlaceHolder}
        label="Name :"
        paddingVertical={10}
        caption=""
      />
      <CInput
        value={form.at}
        onChangeText={(t) =>
          setForm({
            ...form,
            at: t.replace(" ", ""),
          })
        }
        placeholder={abc.atPlaceHolder}
        label="At :"
        paddingVertical={10}
        caption=" Only letters and numbers"
      />
      <Panel paddingVertical={20}>
        <Toggle
          checked={form.public}
          onChange={(checked) =>
            setForm({
              ...form,
              public: checked,
            })
          }>
          {`${abc.groupPublic} - ${form.public ? abc.yes : abc.no}`}
        </Toggle>
      </Panel>
      {!loading && (
        <>
          <CButton text={abc.createButton} onPress={() => onCreate()} />
          <CButton
            text={abc.backButton}
            appeareance="ghost"
            paddingVertical={10}
            onPress={() => callBack(null)}
          />
        </>
      )}
      {loading && <LoadingPanel text={abc.creatingLoading} />}
    </Panel>
  );
};
export default CreateGroup;
