import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "@views/SignIn";
import { apiRequest } from "app/api/apiRequest";
import client from "app/api/client";
import asyncStorage, { Keys } from "app/helper/asyncStorage";
import { getAuthState, updateAuthState } from "app/store/auth";
import { useDispatch, useSelector } from "react-redux";

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

  const loggedIn = authState.profile ? true : false;
  return { signIn, authState, loggedIn };
};

export default useAuth;
