import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";

export const refeshToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refresh-token");

  console.log(refeshToken);

  if (!refreshToken) return null;

  try {
    const res = await client.post("/api/auth/refresh-token", {
      refreshToken,
    });

    const { access, refresh } = res.data.tokens;
    await AsyncStorage.setItem("access-token", access);
    await AsyncStorage.setItem("refresh-token", refresh);
    return access;
  } catch (error) {
    return null;
  }
};
