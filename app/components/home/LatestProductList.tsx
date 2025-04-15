import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductGridView from "./ProductGridView";

interface Props {
  data: LatestProduct[];
  onPress(product: LatestProduct): void;
}

export type LatestProduct = {
  id: string;
  name: string;
  thumbnail?: string;
  category: string;
  price: number;
};

const LatestProductList: FC<Props> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sản phẩm mới nhất</Text>
      <ProductGridView onPress={onPress} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: 600,
    color: colors.primary,
    fontSize: 24,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
});

export default LatestProductList;
