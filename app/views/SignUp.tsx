import FormInput from "@ui/FormInput";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/Auth";

interface Props {}

const SignUp: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <CustomKeyboardAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader
          imageUrl={require("../../assets/images/heroSignUp.png")}
          heading="Join the Marketplace."
          subHeading="Create your account to buy, sell, and chat directly with real people around you."
        />
        <View style={styles.formContainer}>
          <FormInput placeholder="Name..." />
          <FormInput
            placeholder="Email..."
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput placeholder="Password..." secureTextEntry />

          <AppButton title="Sign Up" />

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
