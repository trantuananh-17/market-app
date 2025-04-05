import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Modal,
} from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "app/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "app/navigation";

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
