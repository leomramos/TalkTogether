import { useKeyboard } from "@react-native-community/hooks";
import { Icon } from "@react-native-material/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserAvatar } from "../components";
import { CallsScreen, ChatsScreen, MyProfileScreen } from "../screens/tabs/";

const Tab = createMaterialTopTabNavigator();

export default TabNavigator = ({ navigation }) => {
  const { colors } = useTheme();

  const keyboard = useKeyboard();

  const styleShow = {
    backgroundColor: colors.gray.first,
    paddingVertical: 5,
  };

  const styleHide =
    Platform.OS !== "ios"
      ? {
          ...styleShow,
          display: "none",
        }
      : styleShow;

  const [tabBarStyle, setTabBarStyle] = useState(styleShow);

  useEffect(
    _ => {
      setTabBarStyle(keyboard.keyboardShown ? styleHide : styleShow);
    },
    [keyboard.keyboardShown]
  );

  const insets = useSafeAreaInsets();

  const iconSize = 25;

  return (
    <Tab.Navigator
      id="TabNavigator"
      initialRouteName="ChatsScreen"
      tabBarPosition="bottom"
      backBehavior="history"
      keyboardDismissMode="none"
      gestureHandlerProps={{}}
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
