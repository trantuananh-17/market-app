import colors from "@utils/colors";
import { FC, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface Props {
  title: string;
  placeholder: string;
}

const FormInput: FC<Props> = ({ title, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.borderActive : styles.borderDeActive,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderText}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 0,
  },
  borderDeActive: {
    borderWidth: 1,
    borderColor: colors.deActive,
  },
  borderActive: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default FormInput;
