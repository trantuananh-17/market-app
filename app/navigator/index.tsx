import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import colors from "@utils/colors";
import { FC, useEffect } from "react";
import Auth from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { Profile, updateAuthState } from "app/store/auth";
import client from "app/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "app/api/apiRequest";
import Loading from "@ui/Loading";
import useAuth from "app/hooks/useAuth";
import TabNavigator from "./TabNavigator";
import { refeshToken } from "app/api/refreshToken";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

interface Props {}

const Navigator: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { loggedIn, authState } = useAuth();

  const fetchAuthState = async () => {
    const token = await AsyncStorage.getItem("access-token");
    if (token) {
      dispatch(updateAuthState({ pending: true, profile: null }));
      let res = await apiRequest<{ profile: Profile }>(
        client.get("/api/auth/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      );

      if (!res) {
        const newAccessToken = await refeshToken();

        if (!newAccessToken) {
          dispatch(updateAuthState({ pending: false, profile: null }));
          await AsyncStorage.multiRemove(["access-token", "refresh-token"]);
          return;
        }

        res = await apiRequest<{ profile: Profile }>(
          client.get("/api/auth/profile", {
            headers: {
              Authorization: "Bearer " + newAccessToken,
            },
          })
        );
        console.log("Đã đăng nhập");
      }

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

  return (
    <NavigationContainer theme={MyTheme}>
      <Loading visiable={authState.pending} />
      {!loggedIn ? <Auth /> : <TabNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigator;
