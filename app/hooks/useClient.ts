import { baseURL } from "app/api/client";
import axios from "axios";
import useAuth from "./useAuth";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import asyncStorage, { Keys } from "app/helper/asyncStorage";
import { apiRequest } from "app/api/apiRequest";
import { useDispatch } from "react-redux";
import { updateAuthState } from "app/store/auth";

const authClient = axios.create({ baseURL: baseURL });

type Response = { tokens: { refresh: string; access: string } };

const useClient = () => {
  const { authState } = useAuth();

  const dispatch = useDispatch();

  //token
  const token = authState.profile?.accessToken;

  authClient.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    //read refresh from async storage
    const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN);

    // then send request get new that token
    const options = {
      method: "POST",
      data: { refreshToken },
      url: `${baseURL}/api/auth/refresh-token`,
    };
    const res = await apiRequest<Response>(axios(options));

    if (res?.tokens) {
      failedRequest.response.config.headers.Authorization =
        "Bearer " + res.tokens.access;
      await asyncStorage.save(Keys.ACCESS_TOKEN, res.tokens.access);
      await asyncStorage.save(Keys.REFRESH_TOKEN, res.tokens.refresh);
      dispatch(
        updateAuthState({
          profile: { ...authState.profile!, accessToken: res.tokens.access },
          pending: false,
        })
      );

      return Promise.resolve;
    }
  };

  createAuthRefreshInterceptor(authClient, refreshAuthLogic);

  return { authClient };
};

export default useClient;
