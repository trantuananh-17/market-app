import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@views/Home";
import { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {}

export type AuthStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AppNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
