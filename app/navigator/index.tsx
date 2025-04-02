import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import colors from "@utils/colors";
import { FC, useEffect } from "react";
import Auth from "./Auth";
import AppNavigator from "./AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, Profile, updateAuthState } from "app/store/auth";
import client from "app/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "app/api/apiRequest";
import Loading from "@ui/Loading";

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
  const dispatch = useDispatch();

  const loggedIn = authState.profile ? true : false;

  const fetchAuthState = async () => {
    const token = await AsyncStorage.getItem("access-token");
    if (token) {
      dispatch(updateAuthState({ pending: true, profile: null }));
      const res = await apiRequest<{ profile: Profile }>(
        client.get("/api/auth/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      );

      if (res) {
        dispatch(updateAuthState({ pending: false, profile: res.profile }));
      } else {
        dispatch(updateAuthState({ pending: false, profile: null }));
      }
    }
  };

  useEffect(() => {
    fetchAuthState();
  }, []);

  console.log(authState.pending);

  return (
    <NavigationContainer theme={MyTheme}>
      <Loading visiable={authState.pending} />
      {!loggedIn ? <Auth /> : <AppNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigator;
