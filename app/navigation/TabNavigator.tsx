import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import AppNavigator from "./app/AppNavigator";
import ProfileNavigator from "./app/ProfileNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";
import Create from "@views/Create";
import Message from "@views/Message";

const Tab = createBottomTabNavigator();

const getOptions = (
  iconName: string,
  title: string
): BottomTabNavigationOptions => {
  return {
    tabBarIcon({ focused, color, size }) {
      return <AntDesign name={iconName as any} size={size} color={color} />;
    },
    title: title,
  };
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeNavigator"
        component={AppNavigator}
        options={getOptions("home", "Home")}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={getOptions("pluscircleo", "Create")}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          ...getOptions("message1", "Message"),
          tabBarBadge: undefined,
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={getOptions("user", "Profile")}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
