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
import * as yup from "yup";
import axios from "axios";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

export const newUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters long.")
    .matches(
      passwordRegex,
      "Password must include: A-Z, a-z, 0-9, and special character (!@#$%^&*)."
    ),
});

interface Props {}

const SignUp: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name: string) => {
    return (text: string) => {
      setUserInfo({ ...userInfo, [name]: text });
    };
  };

  const handleSubmit = async () => {
    try {
      const info = await newUserSchema.validate(userInfo);
      axios.post("");
    } catch (error) {
      console.log(error);
    }
  };

  const { email, name, password } = userInfo;

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
          <FormInput
            placeholder="Name..."
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
            value={password}
            onChangeText={handleChange("password")}
          />

          <AppButton title="Sign Up" onPress={handleSubmit} />

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
