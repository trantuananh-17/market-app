import { FC } from "react";
import { Image, StyleSheet } from "react-native";

interface Props {
  uri?: string;
  width?: number;
  height?: number;
}

const ProductImage: FC<Props> = ({ uri, width = 80, height = 80 }) => {
  return (
    <Image
      source={{ uri }}
      style={[styles.image, { width, height }]}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    backgroundColor: "#eee",
  },
});

export default ProductImage;
