import { StyleSheet } from "react-native";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import ForgetPassword from "@views/ForgetPassword";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import colors from "@utils/colors";
import { FC } from "react";
import Auth from "./Auth";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

interface Props {}

const Navigator: FC<Props> = (props) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Auth />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigator;
