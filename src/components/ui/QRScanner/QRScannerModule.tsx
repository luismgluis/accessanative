import { useNavigation } from "@react-navigation/core";
import { useCallback } from "react";

export function InvokeQrScanner(callBack: (data: string) => void): () => void {
  const navigation = useNavigation();
  const goQrScanner = useCallback(() => {
    const params = {
      myCallBack: (data: string) => {
        callBack(data);
      },
    };
    navigation.navigate("QrScanner", params);
    //setMenuTopVisible(false);
  }, [navigation, callBack]);
  return goQrScanner;
}
