import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CallItem,
  CustomInput,
  CustomText,
  List,
  OnlineIcon,
  OverlayMenu,
  PageHeader,
  ScreenContainer,
} from "../../components";

import { Row } from "../../components";
import i18n from "../../i18n";

export default Calls = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const callsAmount = 30;
  const [calls, setCalls] = useState(
    Array(callsAmount)
      .fill()
      .map((_, k) => ({
        _id: k,
        name: Array(Math.floor(Math.random() * (10 - 3 + 1) + 3))
          .fill()
          .map(_ => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
          .join(""),
        online: Math.random() < 0.5,
        date: new Date() - Math.floor(Math.random() * 100 * 1000000000),
        country: "br",
        duration: 20000000,
      }))
  );

  const theme = useTheme();

  const renderItem = ({ item }) => {
    return (
      <CallItem
        name={item.name}
        offline={!item.online}
        country={item.country}
        duration={item.duration}
        date={item.date}
        handlePress={() =>
          navigation.navigate("Modals", {
            screen: "ProfileScreen",
            params: { user: item },
          })
        }
      />
    );
  };

  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("callHistory")} sideActions={[]} />
      <List
        style={{
          marginTop: 0,
          marginBottom: -insets.bottom,
          paddingBottom: 30,
        }}
        theme={theme}
        data={calls}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={<View style={{ height: 20 }}></View>}
      />
    </ScreenContainer>
  );
};
