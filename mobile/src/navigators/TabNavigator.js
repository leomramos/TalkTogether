import { Icon } from "@react-native-material/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../../App";
import { UserAvatar } from "../components";
import { CallsScreen, ChatsScreen, MyProfileScreen } from "../screens/tabs/";

const Tab = createMaterialTopTabNavigator();

export default TabNavigator = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useUser();

  const insets = useSafeAreaInsets();

  const iconSize = 25;

  return (
    <Tab.Navigator
      id="TabNavigator"
      initialRouteName="ChatsScreen"
      tabBarPosition="bottom"
      backBehavior="history"
      keyboardDismissMode="none"
      screenOptions={{
        tabBarVisible: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple.sixth,
        tabBarInactiveTintColor: colors.gray.seventh,
        tabBarStyle: { backgroundColor: colors.gray.first, paddingVertical: 5 },
        tabBarIndicatorStyle: {
          backgroundColor: colors.purple.sixth,
          height: 5,
          position: "relative",
        },
        tabBarContentContainerStyle: {
          paddingBottom: insets.bottom,
        },
      }}
    >
      {user.languages.length > 0 && (
        <>
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
        </>
      )}
      <Tab.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => (
            <UserAvatar
              avatar={user.avatar.style}
              color={user.avatar.color}
              background={colors.gray.first}
              size={iconSize}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
