import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import FormDivider from "@ui/FormDivider";
import ProductButton from "@ui/product/ProductButton";
import ProductImage from "@ui/product/ProductImage";
import colors from "@utils/colors";
import { apiRequest } from "app/api/apiRequest";
import useClient from "app/hooks/useClient";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Product } from "./ProductInfo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParam } from "app/navigation/app/ProfileNavigator";
import { formatDate } from "app/helper/date";
import { formatPrice } from "app/helper/price";

interface Props {}

type ListingRes = {
  products: Product[];
};

const MyProductList: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParam>>();
  const [Listings, setListings] = useState<Product[]>([]);
  const { authClient } = useClient();

  const fetchList = async () => {
    const res = await apiRequest<ListingRes>(
      authClient.get("/api/product/listings")
    );

    if (res) setListings(res.products);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View>
      <AppHeader backButton={<BackButton />} />

      <FlatList
        style={styles.container}
        data={Listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.productItem}>
              <ProductImage uri={item.thumbnail} />
              <View style={styles.info}>
                <Text style={styles.textName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text>Giá: {formatPrice(item.price)}</Text>
                <Text>Ngày đăng: {formatDate(item.date, "dd/MM/yyyy")}</Text>
              </View>
              <View style={styles.button}>
                <ProductButton
                  title="Chỉnh sửa"
                  onPress={() => navigate("ProductInfo", { product: item })}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  productItem: {
    padding: 5,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
    gap: 10,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  textName: {
    fontSize: 16,
    fontWeight: 600,
    flex: 1,
  },
  button: {
    alignSelf: "center",
  },
});

export default MyProductList;
