import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  backButton?: JSX.Element | null;
  center?: JSX.Element | null;
  right?: JSX.Element | null;
}

const AppHeader: FC<Props> = ({ backButton, center, right }) => {
  const { goBack, canGoBack } = useNavigation();

  return (
    <View style={styles.container}>
      {/* back button */}
      {canGoBack() && <Pressable onPress={goBack}>{backButton}</Pressable>}
      {/* center ui  */}
      {center}
      {/* right ui */}
      {right}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 10,
    zIndex: 10,
  },
});

export default AppHeader;
