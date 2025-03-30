import colors from "@utils/colors";
import FormInput from "@ui/FormInput";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";

interface Props {}

const SignIn: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <WelcomeHeader />
      <View style={styles.formContainer}>
        <FormInput
          placeholder="Email..."
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput placeholder="Password..." secureTextEntry />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
