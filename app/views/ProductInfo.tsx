import AppHeader from "@components/AppHeader";
import ProductDetail from "@components/ProductDetail";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@ui/BackButton";
import { ProfileNavigatorParam } from "app/navigation/app/ProfileNavigator";
import { FC, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@utils/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
<AntDesign name="message1" size={24} color="black" />;

type Props = NativeStackScreenProps<ProfileNavigatorParam, "ProductInfo">;

const ProductInfo: FC<Props> = ({ route }) => {
  const { product } = route.params;
  const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParam>>();

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        {product ? <ProductDetail product={product} /> : <></>}

        <Pressable
          onPress={() => navigate("ChatWindow")}
          style={styles.messageButton}
        >
          <AntDesign name="message1" size={24} color={colors.white} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: 20,
    right: 30,
  },
});

export default ProductInfo;
