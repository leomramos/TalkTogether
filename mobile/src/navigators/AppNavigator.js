import { Icon } from "@react-native-material/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Calls from "../screens/Calls";
import Chats from "../screens/Chats";
import MyProfile from "../screens/MyProfile";

const Tab = createMaterialTopTabNavigator();

export default AppStack = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const iconSize = 25;

  return (
    <Tab.Navigator
      id="AppStack"
      initialRouteName="Chats"
      tabBarPosition="bottom"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.focused,
        tabBarInactiveTintColor: colors.unfocused,
        tabBarStyle: {
          backgroundColor: colors.surface,
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
        name="Calls"
        component={Calls}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="phone" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="message" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
