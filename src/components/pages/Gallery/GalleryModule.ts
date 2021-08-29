import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FeedImageType } from "../../ui/FeedImages/FeedImages";

export function InvokeGallery(
  callBack: (data: FeedImageType) => void,
): () => void {
  const navigation = useNavigation();
  const goGallery = useCallback(() => {
    const params = {
      myCallBack: (data: FeedImageType) => {
        callBack(data);
      },
    };
    navigation.navigate("Gallery", params);
    //setMenuTopVisible(false);
  }, [navigation, callBack]);
  return goGallery;
}
