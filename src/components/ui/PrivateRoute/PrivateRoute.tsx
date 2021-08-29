import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
const Stack = createStackNavigator();
type PrivateRouteProps = {
  name: string;
  component: any;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({ name, component }) => {
  const me = useCurrentUser();
  const navigation = useNavigation();
  if (!me.isEmpty()) {
    navigation.navigate("Login");
  }
  return <Stack.Screen name={name}>{component}</Stack.Screen>;
};
export default PrivateRoute;
