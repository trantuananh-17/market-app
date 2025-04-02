import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import colors from "@utils/colors";
import { FC } from "react";
import Auth from "./Auth";
import AppNavigator from "./AppNavigator";
import { useSelector } from "react-redux";
import { getAuthState } from "app/store/auth";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

interface Props {}

const Navigator: FC<Props> = (props) => {
  const authState = useSelector(getAuthState);

  console.log(authState);

  const loggedIn = true;
  return (
    <NavigationContainer theme={MyTheme}>
      {!loggedIn ? <Auth /> : <AppNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigator;
