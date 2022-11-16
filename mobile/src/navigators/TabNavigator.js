import { Icon } from "@react-native-material/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserAvatar } from "../components";
import { CallsScreen, ChatsScreen, MyProfileScreen } from "../screens/tabs/";

const Tab = createMaterialTopTabNavigator();

export default TabNavigator = ({ navigation }) => {
  const { colors } = useTheme();

  const [tabBarStyle, setTabBarStyle] = useState({
    backgroundColor: colors.gray.first,
    paddingVertical: 5,
  });

  const _keyboardDidShow = useCallback(() => {
    setTabBarStyle({
      display: "none",
    });
  }, [navigation]);

  const _keyboardDidHide = useCallback(() => {
    setTabBarStyle({
      backgroundColor: colors.gray.first,
      paddingVertical: 5,
    });
  }, [navigation]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, [_keyboardDidHide, _keyboardDidShow]);

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
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple.sixth,
        tabBarInactiveTintColor: colors.gray.seventh,
        tabBarStyle,
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
          tabBarIcon: ({ focused }) => (
            <UserAvatar
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
