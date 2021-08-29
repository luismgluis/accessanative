import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { IndexPath, Select, Text, SelectItem } from "@ui-kitten/components/ui";
import { useRef } from "react";
import { useEffect } from "react";
import utils from "../../../libs/utils/utils";
import { useTheme } from "../../hooks/useTheme";

const styles = StyleSheet.create({ container: {} });

const TAG = "CUSTOM SELECT";
type CSelectProps = {
  style?: StyleProp<ViewStyle>;
  data: string[];
  onChange?: (res: string) => void;
};
const CSelect: React.FC<CSelectProps> = ({
  style,
  data = [],
  onChange = () => null,
}) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const initialValue = useRef("");

  useEffect(() => {
    const value = (() => {
      if (typeof data[selectedIndex.row] !== "undefined") {
        return data[selectedIndex.row];
      }
      return "";
    })();

    console.log(value);
    if (value !== initialValue.current) {
      initialValue.current = value;
      console.log("send update");
      onChange(value);
    }
  }, [selectedIndex]);

  console.log(TAG, selectedIndex);
  return (
    <Panel style={styles.container} level="1">
      <Select
        size="large"
        placeholder="Selecciona alguna opción"
        value={() => (
          <Text style={{ fontSize: 18 }}>{data[selectedIndex.row]}</Text>
        )}
        // value={data[selectedIndex.row]}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          const data: any = index;
          setSelectedIndex(data);
        }}>
        {data.map((item) => {
          return (
            <SelectItem
              key={utils.generateKey(item)}
              title={() => (
                <Text style={{ fontSize: 18 }}>{item.toUpperCase()}</Text>
              )}
            />
          );
        })}
      </Select>
    </Panel>
  );
};
export default CSelect;
