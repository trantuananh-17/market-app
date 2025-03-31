import FormInput from "@ui/FormInput";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/Auth";

interface Props {}

const ForgetPassword: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

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
          />

          <AppButton title="Send" />

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
