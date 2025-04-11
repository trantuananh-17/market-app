import ProductImage from "@ui/product/ProductImage";
import colors from "@utils/colors";
import { FC, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, ViewToken } from "react-native";

interface Props {
  images?: string[];
}

const ImageSlider: FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Item hiển thị 50% được tính là thay đổi
  const viewableConfig = useRef({ itemVisiblePercentThreshold: 50 });

  // Khi kéo ảnh hiện thị đủ % thì cập nhật lại state
  // viewableItems: Những item trên màn hình
  // changed: Danh sách item mới được hiển thị hoặc bị ẩn đi.
  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setActiveIndex(info.viewableItems[0].index || 0);
    }
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={images}
        renderItem={({ item }) => <ProductImage uri={item} isChecked />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfig={viewableConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>
          {activeIndex + 1} / {images?.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  flatList: {
    position: "relative",
  },
  indicator: {
    position: "absolute",
    width: 35,
    height: 25,
    backgroundColor: colors.backDrop,
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  indicatorText: {
    color: colors.white,
    fontWeight: 600,
  },
});

export default ImageSlider;
