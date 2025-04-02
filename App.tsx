import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import Navigator from "app/navigator";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "app/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigator />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
