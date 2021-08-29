import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginCreateAccount from "./LoginCreateAccount/LoginCreateAccountScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import { horizontalAnimation } from "../../../libs/anim/ScreensAnimation";

const TAG = "LOGIN STACK";

const { Navigator, Screen } = createStackNavigator();

const LoginStack: React.FC = (props) => {
  return (
    <Navigator
      headerMode="none"
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        ...horizontalAnimation,
      }}>
      <Screen name="LoginCreateAccount" component={LoginCreateAccount} />
      <Screen name="LoginScreen" component={LoginScreen} />
    </Navigator>
  );
};
export default LoginStack;
