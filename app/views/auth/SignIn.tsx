import FormInput from "@ui/FormInput";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userSchema, yupValidate } from "@utils/validator";
import { showErrorToast } from "app/helper/toastHelper";
import useAuth from "app/hooks/useAuth";
import { AuthStackParamList } from "app/navigation/auth/Auth";

interface Props {}

const SignIn: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { signIn } = useAuth();
  const handleChange = (name: string) => {
    return (text: string) => {
      setUserInfo({ ...userInfo, [name]: text });
    };
  };

  const handleSubmit = async () => {
    const { values, error } = await yupValidate(userSchema, userInfo);

    if (error) {
      return showErrorToast({ title: "Lỗi", message: error });
    }
    if (values) signIn(values);
  };

  const { email, password } = userInfo;

  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader
          imageUrl={require("../../../assets/images/hero.png")}
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

          <AppButton title="Sign In" onPress={handleSubmit} />

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
