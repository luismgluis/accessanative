import React, { useState, useEffect } from "react";
import { Toggle } from "@ui-kitten/components";
import { useAbc, useSetAbc } from "../../hooks/useAbc";

const TAG = "LANGUAGE TOGGLE";
type LanguageToggleProps = {};
const LanguageToggle: React.FC<LanguageToggleProps> = ({}) => {
  const abc = useAbc();
  const dicc = abc.abc.languages;
  const setLang = useSetAbc();
  const [checked, setChecked] = useState(false);
  const onCheckedChange = (check: boolean) => {
    setChecked(check);
    setLang(checked ? "spanish" : "english");
  };
  useEffect(() => {
    setChecked(false);
    setLang("spanish");
  }, []);

  console.log(TAG, abc);
  return (
    <Toggle checked={checked} onChange={onCheckedChange}>
      {checked ? dicc.english : dicc.spanish}
    </Toggle>
  );
};
export default LanguageToggle;
