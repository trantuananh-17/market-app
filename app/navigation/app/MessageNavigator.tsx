import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatWindow from "@views/ChatWindow";
import Message from "@views/Message";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {}

const Stack = createNativeStackNavigator<MessageStackParamList>();

export type MessageStackParamList = {
  Message: undefined;
  ChatWindow: undefined;
};

const MessageNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MessageNavigator;
