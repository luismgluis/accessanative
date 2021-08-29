import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import api from "./src/libs/api/api";
import LoginStack from "./src/components/pages/Login/LoginStack";
import { useDispatch } from "react-redux";
import utils from "./src/libs/utils/utils";
import { setCurrentReduxUser } from "./src/reducers/actions/actionsCurrentSession";
import { useNavigation } from "@react-navigation/core";
import LoadingScreen from "./src/components/ui/LoadingScreen/LoadingScreen";
import Home from "./src/components/pages/Home/Home";
import GalleryStack from "./src/components/pages/Gallery/GalleryStack";
import ImageViewer from "./src/components/ui/ImageViewer/ImageViewer";
import QRScannerScreen from "./src/components/ui/QRScanner/QRScannerScreen";
import { useCurrentUser } from "./src/components/hooks/useCurrentUser";
import { horizontalAnimation } from "./src/libs/anim/ScreensAnimation";
import QrCodeViewer from "./src/components/ui/QrCodeViewer/QrCodeViewer";
import ResidentInfoScreen from "./src/components/pages/ResidentInfo/ResidentInfoScreen";
import ResidentHistoryScreen from "./src/components/pages/ResidentHistory/ResidentHistoryScreen";
import MyGroups from "./src/components/pages/MyGroups/MyGroups";
import Channels from "./src/components/pages/Channels/Channels";
import ProfileScreen from "./src/components/pages/Profile/ProfileScreen";
import MasiveMsj from "./src/components/pages/MasiveMsj/MasiveMsj";
import { useAbc } from "./src/components/hooks/useAbc";

const TAG = "APP NAV";

const { Navigator, Screen } = createStackNavigator();

const ScreenLoading = (props: any) => {
  const me = useCurrentUser();
  const navigation = useNavigation();
  const abc = useAbc().abc.AppNavLoading;
  useEffect(() => {
    setTimeout(() => {
      if (me.isEmpty()) {
        navigation.navigate("Login");
      } else {
        navigation.navigate("Home");
      }
    }, 200);
  }, [navigation, me]);
  return <LoadingScreen title={abc.welcome} subTitle={abc.wait} />;
};

const AppNav: React.FC = () => {
  const dispatch = useDispatch();
  const me = useCurrentUser();
  useEffect(() => {
    console.log(TAG, "eff");
    const unsubs = api.users.onCurrentUserUpdate((user) => {
      if (!utils.objects.isEmpty(user)) {
        if (me.id !== user.id) {
          if (!user.isEmpty()) {
            dispatch(setCurrentReduxUser(user));
          }
        }
      }
    });
    return () => {
      unsubs();
    };
  }, [dispatch, me]);
  return (
    <Navigator
      key={me.id}
      headerMode="none"
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        ...horizontalAnimation,
      }}>
      <Screen name="LoadingScreen" component={ScreenLoading} />
      <Screen name="Login" component={LoginStack} />
      <Screen name="Home" component={Home} />
      <Screen name="Gallery" component={GalleryStack} />
      <Screen name="ImageViewer" component={ImageViewer} />
      <Screen name="MyGroups" component={MyGroups} />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="Channels" component={Channels} />
      <Screen name="QrViewer" component={QrCodeViewer} />
      <Screen name="MasiveMsj" component={MasiveMsj} />
      <Screen name="ResidentInfo" component={ResidentInfoScreen} />
      <Screen name="ResidentHistory" component={ResidentHistoryScreen} />
      <Screen name="QrScanner" component={QRScannerScreen} />
    </Navigator>
  );
};

export default AppNav;
