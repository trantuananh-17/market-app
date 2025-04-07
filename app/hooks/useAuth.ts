import { apiRequest } from "app/api/apiRequest";
import client from "app/api/client";
import asyncStorage, { Keys } from "app/helper/asyncStorage";
import { getAuthState, updateAuthState } from "app/store/auth";
import { useDispatch, useSelector } from "react-redux";
import useClient from "./useClient";

type UserInfo = {
  email: string;
  password: string;
};

export interface SignInResponse {
  profile: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar?: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

const useAuth = () => {
  const { authClient } = useClient();
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);

  const signIn = async (userInfo: UserInfo) => {
    dispatch(updateAuthState({ profile: null, pending: true }));
    const res = await apiRequest<SignInResponse>(
      client.post("/api/auth/sign-in", userInfo)
    );
    if (res) {
      // store the token
      await asyncStorage.save(Keys.ACCESS_TOKEN, res.tokens.access);
      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
      // await AsyncStorage.setItem("access-token", res.tokens.access);
      // await AsyncStorage.setItem("refresh-token", res.tokens.refresh);
      dispatch(
        updateAuthState({
          profile: { ...res.profile, accessToken: res.tokens.access },
          pending: false,
        })
      );
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  const signOut = async () => {
    const token = await asyncStorage.get(Keys.REFRESH_TOKEN);

    if (token) {
      dispatch(updateAuthState({ profile: authState.profile, pending: true }));

      await authClient.post("/api/auth/sign-out", {
        refreshToken: token,
      });

      await asyncStorage.remove(Keys.REFRESH_TOKEN);
      await asyncStorage.remove(Keys.ACCESS_TOKEN);
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  const loggedIn = authState.profile ? true : false;
  return { signIn, authState, loggedIn, signOut };
};

export default useAuth;
