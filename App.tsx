import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import Navigator from "app/navigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
