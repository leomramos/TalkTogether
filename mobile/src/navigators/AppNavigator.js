import { Icon } from "@react-native-material/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CallsScreen from "../screens/tabs/Calls";
import ChatsScreen from "../screens/tabs/Chats";
import MyProfileScreen from "../screens/tabs/MyProfile";

const Tab = createMaterialTopTabNavigator();

export default AppStack = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const iconSize = 25;

  return (
    <Tab.Navigator
      id="AppStack"
      initialRouteName="ChatsScreen"
      tabBarPosition="bottom"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.focused,
        tabBarInactiveTintColor: colors.unfocused,
        tabBarStyle: {
          backgroundColor: colors.backgroundAccent,
          paddingVertical: 5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.focused,
          height: 5,
          position: "relative",
        },
        tabBarContentContainerStyle: {
          paddingBottom: insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="CallsScreen"
        component={CallsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="phone" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="message" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
