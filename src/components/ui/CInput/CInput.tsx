import React from "react";
import { Icon, Input, InputProps } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";
import { useTheme } from "../../hooks/useTheme";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const TAG = "CUSTOM INPUT";

export interface CInputPropsX extends InputProps {
  captionIcon?: any;
  paddingVertical?: number;
  paddingHorizontal?: number;
  typePassword?: boolean;
  ref?: any;
}
const CInput: React.FC<CInputPropsX> = (props) => {
  const {
    typePassword = false,
    paddingVertical = 0,
    paddingHorizontal = 0,
    ref,
  } = props;
  const theme = useTheme();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const cStyles = {
    ...utils.objects.cloneObject(props.style),
    borderColor: theme.colors["color-primary-500"],
    backgroundColor: theme.colors["color-basic-500"],
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      ref={ref}
      secureTextEntry={typePassword ? secureTextEntry : false}
      accessoryRight={typePassword ? renderIcon : undefined}
      {...props}
      style={cStyles}
    />
  );
};
export default CInput;
