import { FC } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LatestProduct } from "./LatestProductList";
import GridView from "@ui/home/GridView";
import { formatPrice } from "app/helper/price";
import colors from "@utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  data: LatestProduct[];
  onPress(item: LatestProduct): void;
}

const ProductGridView: FC<Props> = ({ data, onPress }) => {
  return (
    <GridView
      data={data}
      col={2}
      renderItem={(item) => {
        return item ? (
          <Pressable
            onPress={() => onPress(item)}
            style={styles.productContainer}
          >
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
            ) : (
              <View style={[styles.thumbnail, styles.noImage]}>
                <Ionicons
                  name="image-outline"
                  size={24}
                  color={colors.textSecondary}
                />
              </View>
            )}
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        ) : (
          <View style={styles.productContainer} />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  productContainer: {
    padding: 5,
  },
  thumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    borderWidth: 0.1,
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textSecondary,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  noImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,
  },
});

export default ProductGridView;
