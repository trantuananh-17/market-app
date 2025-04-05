import FormInput from "@ui/FormInput";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { newUserSchema, yupValidate } from "@utils/validator";
import { apiRequest } from "app/api/apiRequest";
import { showErrorToast, showSuccessToast } from "app/helper/toastHelper";
import client from "app/api/client";
import useAuth from "app/hooks/useAuth";
import { AuthStackParamList } from "app/navigation/auth/Auth";

interface Props {}

const SignUp: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const { email, name, password } = userInfo;

  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleChange = (name: string) => {
    return (text: string) => {
      setUserInfo({ ...userInfo, [name]: text });
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { values, error } = await yupValidate(newUserSchema, userInfo);

    if (error) {
      setLoading(false);
      return showErrorToast({ title: "Lỗi", message: error });
    }

    const res = await apiRequest<{ message: string }>(
      client.post("/api/auth/sign-up", values)
    );

    if (res?.message) {
      showSuccessToast({ title: "Thành công", message: res.message });
      if (values) signIn(values);
    }

    setLoading(false);
  };

  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader
          imageUrl={require("../../assets/images/heroSignUp.png")}
          heading="Join the Marketplace."
          subHeading="Create your account to buy, sell, and chat directly with real people around you."
        />
        <View style={styles.formContainer}>
          <FormInput
            placeholder="Name..."
            autoCapitalize="none"
            value={name}
            onChangeText={handleChange("name")}
          />
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
            autoCapitalize="none"
            value={password}
            onChangeText={handleChange("password")}
          />

          <AppButton active={!loading} title="Sign Up" onPress={handleSubmit} />

          <FormDivider />

          <FormNavigator
            topTitle=""
            bottomTitle="Sign In"
            footerTitle="Already have account?"
            onBottomPress={() => navigate("SignIn")}
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

export default SignUp;
