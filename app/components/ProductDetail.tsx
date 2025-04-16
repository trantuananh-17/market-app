import { formatDate } from "app/helper/date";
import { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AvatarView from "./AvatarView";
import colors from "@utils/colors";
import { formatPrice } from "app/helper/price";
import ImageSlider from "./ImageSlider";
import { Product } from "app/store/listing";
import FormDivider from "@ui/FormDivider";

interface Props {
  product: Product;
}

const ProductDetail: FC<Props> = ({ product }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageSlider images={product.images} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <View style={styles.box}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.date}>
          Ngày đăng: {formatDate(product.date, "dd/MM/yyyy")}
        </Text>
      </View>
      <Text style={styles.descriptionTitle}>Mô tả:</Text>
      <Text style={styles.description}>{product.description}</Text>

      <FormDivider width="90%" />

      <View style={styles.profileContainer}>
        <AvatarView uri={product.seller.avatar} size={60} />
        <Text style={styles.profileName}>{product.seller.name}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  category: {
    color: colors.textSecondary,
    fontWeight: "regular",
    fontSize: 18,
  },
  price: {
    marginTop: 10,
    color: colors.textPrimary,
    fontWeight: 700,
    fontSize: 20,
  },
  date: {
    marginTop: 10,
    color: colors.textPrimary,
    fontWeight: 500,
    fontSize: 16,
  },
  name: {
    marginTop: 15,
    color: colors.textPrimary,
    fontWeight: 700,
    fontSize: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 500,
    color: colors.textPrimary,
  },
  description: {
    marginTop: 5,
    color: colors.textSecondary,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginLeft: 10,
    color: colors.black,
    fontWeight: 700,
    fontSize: 20,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProductDetail;
