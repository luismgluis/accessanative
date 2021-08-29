import React, { useEffect, useMemo } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import AppNav from "./AppNav";
import AppMain from "./AppMain";
import { useTheme } from "./src/components/hooks/useTheme";
// UI KITTEN
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const TAG = "APP PROVIDER";

type AppProviderProps = {
  setColorStatusBar: (color: string) => void;
};

const AppProvider: React.FC<AppProviderProps> = ({ setColorStatusBar }) => {
  const theme = useTheme();
  useEffect(() => {
    setColorStatusBar(theme.colors["color-primary-600"]);
  }, [setColorStatusBar, theme]);

  const containerStyles: any = {
    flex: 1,
    backgroundColor: theme.colors["color-basic-500"],
  };
  const evaTheme = useMemo(() => {
    if (theme.number === 1) {
      return { ...eva.dark }; //, ...theme.colors
    }
    return { ...eva.light, ...theme.colors }; //,
  }, [theme]);
  return (
    <SafeAreaView style={containerStyles}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={evaTheme}>
        <Host>
          <AppMain>
            <NavigationContainer>
              <AppNav />
            </NavigationContainer>
          </AppMain>
        </Host>
      </ApplicationProvider>
    </SafeAreaView>
  );
};

export default AppProvider;
