import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import ProductButton from "@ui/product/ProductButton";
import ProductImage from "@ui/product/ProductImage";
import colors from "@utils/colors";
import { apiRequest } from "app/api/apiRequest";
import useClient from "app/hooks/useClient";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParam } from "app/navigation/app/ProfileNavigator";
import { formatDate } from "app/helper/date";
import { formatPrice } from "app/helper/price";
import { showSuccessToast } from "app/helper/toastHelper";
import Loading from "@ui/Loading";
import {
  deleteItem,
  getListings,
  Product,
  updateListings,
} from "app/store/listing";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

type ListingRes = {
  products: Product[];
};

const MyProductList: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParam>>();
  // const [listings, setListings] = useState<Product[]>([]);
  const { authClient } = useClient();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const listings = useSelector(getListings);

  const confirmDelete = async (productId: string) => {
    if (!productId) return;

    setLoading(true);
    const res = await apiRequest<{ message: string }>(
      authClient.delete("/api/product/" + productId)
    );
    setLoading(false);

    if (res?.message) {
      dispatch(deleteItem(productId));
      showSuccessToast({ title: "Thành công", message: res.message });
    }

    setIsFetch(true);
  };

  const onDeletePress = (item: Product) => {
    Alert.alert(
      "Xác nhận xóa sản phẩm",
      "Xóa sản phẩm khỏi danh sách sản phẩm của bạn. Hành động này không thể hoàn tác.",
      [
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => confirmDelete(item.id),
        },
        { text: "Hủy", style: "cancel" },
      ]
    );
  };

  const fetchList = async () => {
    setFetching(true);
    const res = await apiRequest<ListingRes>(
      authClient.get("/api/product/listings")
    );
    setFetching(false);

    if (res) dispatch(updateListings(res.products));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.body}>
      <AppHeader backButton={<BackButton />} />

      <FlatList
        refreshing={fetching}
        onRefresh={fetchList}
        style={styles.container}
        data={listings}
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
                  title="edit"
                  color={colors.primary}
                  onPress={() => navigate("ProductInfo", { product: item })}
                />
                <ProductButton
                  title="delete"
                  color={colors.red}
                  onPress={() => onDeletePress(item)}
                />
              </View>
            </View>
          );
        }}
      />
      <Loading visiable={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
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
    flexDirection: "row",
    gap: 3,
    alignSelf: "center",
  },
});

export default MyProductList;
