import FormInput from "@ui/FormInput";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/Auth";
import { userSchema, yupValidate } from "@utils/validator";
import { showErrorToast, showSuccessToast } from "app/helper/toastHelper";
import axios from "axios";
import { apiRequest } from "app/api/apiRequest";
import client from "app/api/client";

interface Props {}

export interface SignInResponse {
  profile: {
    id: string;
    email: string;
    name: string;
    verifired: boolean;
    avatar?: string;
  };
  token: {
    refresh: string;
    access: string;
  };
}

const SignIn: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name: string) => {
    return (text: string) => {
      setUserInfo({ ...userInfo, [name]: text });
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { values, error } = await yupValidate(userSchema, userInfo);

    if (error) {
      setLoading(false);
      return showErrorToast({ title: "Lỗi", message: error });
    }

    const res = await apiRequest<SignInResponse>(
      client.post("/api/auth/sign-in", values)
    );

    if (res) {
      // store the token
      console.log(res);
    }

    setLoading(false);
  };

  const { email, password } = userInfo;

  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader
          imageUrl={require("../../assets/images/hero.png")}
          heading="Welcome Back!"
          subHeading="Sign in to explore, connect, and start trading with people near you."
        />
        <View style={styles.formContainer}>
          <FormInput
            placeholder="Email..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleChange("email")}
          />
          <FormInput
            placeholder="Password..."
            secureTextEntry
            value={password}
            onChangeText={handleChange("password")}
          />

          <AppButton active={!loading} title="Sign In" onPress={handleSubmit} />

          <FormDivider />

          <FormNavigator
            topTitle="Forget Password?"
            bottomTitle="Sign Up"
            footerTitle="Don't have an account?"
            onTopPress={() => navigate("ForgetPassword")}
            onBottomPress={() => navigate("SignUp")}
          />
        </View>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 30,
  },
  image: {
    width: 250,
    height: 250,
  },
  formContainer: {
    marginTop: 30,
  },
});

export default SignIn;
