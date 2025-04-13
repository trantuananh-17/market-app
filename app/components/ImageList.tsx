import colors from "@utils/colors";
import { FC } from "react";
import {
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

interface Props {
  images: string[];
  onPress?(item: string): void;
  onDelete?(item: string): void;
  onLongPress?(item: string): void;
}

const ImageList: FC<Props> = ({ images, onPress, onDelete, onLongPress }) => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => {
        return (
          <View>
            <Image style={styles.image} source={{ uri: item }} />

            {/* Nút X xoá ảnh */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete?.(item)}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>

            <Pressable
              onPress={() => onPress?.(item)}
              style={StyleSheet.absoluteFillObject}
              onLongPress={() => onLongPress?.(item)}
            />
          </View>
        );
      }}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginLeft: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginLeft: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: colors.black,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  deleteText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ImageList;
