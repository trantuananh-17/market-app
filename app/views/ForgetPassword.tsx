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
import { emailRegex } from "@utils/validator";
import { showErrorToast, showSuccessToast } from "app/helper/toastHelper";
import client from "app/api/client";
import { apiRequest } from "app/api/apiRequest";

interface Props {}

const ForgetPassword: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async () => {
    setLoading(true);

    if (!emailRegex.test(email)) {
      setLoading(false);
      return showErrorToast({
        title: "Lỗi",
        message: "Email không hợp lệ!",
      });
    }

    const res = await apiRequest<{ message: string }>(
      client.post("/api/auth/forget-pass", { email })
    );

    setLoading(false);

    if (res) {
      showSuccessToast({
        title: "Thành công",
        message: res.message,
      });
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader
          imageUrl={require("../../assets/images/heroForgotPassword.png")}
          heading="Reset Your Password."
          subHeading="Don't worry — we'll help you get back into your account in no time."
        />
        <View style={styles.formContainer}>
          <FormInput
            placeholder="Email..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <AppButton active={!loading} title="Send" onPress={handleSubmit} />

          <FormDivider />

          <FormNavigator
            topTitle=""
            bottomTitle="Sign Up"
            footerTitle="Don't have an account?"
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

export default ForgetPassword;
