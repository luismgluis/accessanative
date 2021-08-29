/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { LogBox, StatusBar, Text } from "react-native";

import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./src/reducers/index.js";

import AppProvider from "./AppProvider";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  // name of the error/warning here, or a regex here
]);
LogBox.ignoreLogs([
  "Warning: isMounted(...) is deprecated",
  "RNDeviceInfo",
  /Require cycle:/,
  "Non-serializable values were found in the navigation state",
]);

const store = createStore(
  reducers, // Reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk),
);

const TAG = "APP PRINCIPAL";

const App: React.FC = () => {
  const [colorBar, setColorBar] = useState("#ffffff");
  const changeBarColor = React.useCallback((color: string) => {
    setColorBar(color);
  }, []);

  return (
    <>
      <StatusBar animated={true} backgroundColor={colorBar} />
      <Provider store={store}>
        <AppProvider setColorStatusBar={changeBarColor} />
      </Provider>
    </>
  );
};

export default App;
