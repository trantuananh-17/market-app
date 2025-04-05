import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@views/Home";
import ProductList from "@views/ProductList";
import { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {}

export type AppStackParamList = {
  Home: undefined;
  ProductList: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductList" component={ProductList} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
