import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangeInfo from "@views/ChangeInfo";
import MyProductList from "@views/MyProductList";
import ProductInfo, { Product } from "@views/ProductInfo";
import Profile from "@views/Profile";
import { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {}

const Stack = createNativeStackNavigator<ProfileNavigatorParam>();

export type ProfileNavigatorParam = {
  Profile: undefined;
  MyProductList: undefined;
  ChangeInfo: undefined;
  ProductInfo: { product?: Product };
};

const ProfileNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyProductList" component={MyProductList} />
      <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;
