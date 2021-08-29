import { NativeModules } from "react-native";

export const moveToBackground = (): any => {
  // Add your additional custom logic here
  const myModule = NativeModules.MoveAppToBackground;
  try {
    return myModule.MoveToBackground();
  } catch (error) {
    console.error("Fail move to background", error);
    return null;
  }
};

// You can directly export this and access it
//export default myModule;
