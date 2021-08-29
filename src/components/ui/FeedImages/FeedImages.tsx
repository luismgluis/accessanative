import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

import FeedImagesRenderItem from "./FeedImagesRenderItem";

const TAG = "FEED IMAGES";

interface FeedProps {
  arrayImages?: Array<FeedImageType>;
  isRefresh?: boolean;
  onRefresh?: () => void;
}
const FeedImages: React.FC<FeedProps> = ({
  arrayImages = [],
  isRefresh = false,
  onRefresh = null,
}) => {
  const theme = useTheme();
  //const [isRefresh, setRefreshing] = useState(false);
  const fnOnRefresh = useCallback(() => {
    if (onRefresh === null) {
      return;
    }
    onRefresh();
  }, [onRefresh]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        horizontal={false}
        numColumns={3}
        data={arrayImages}
        renderItem={({ item }) => (
          <FeedImagesRenderItem theme={theme} data={item} />
        )}
        keyExtractor={(item) => item.key}
        maxToRenderPerBatch={5}
        initialNumToRender={20}
        onEndReached={() => fnOnRefresh()}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={fnOnRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 12 },
  flatListContainer: { margin: 4 },
  view1: {
    flex: 12,
    maxHeight: 50,
  },
  view2: { flex: 12 },
  content: { flex: 12 },
});

export default FeedImages;

export interface FeedImageType {
  key: string;
  uri: string;
  type: string;
  title: string;
  timeStamp: number;
  duration?: number;
  dimensions?: string;
  isVideo: boolean;
  imageFromCamera?: boolean;
  update: (data: FeedImageType) => void;
  onPress: (data: FeedImageType) => void;
}
