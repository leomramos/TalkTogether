import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CallItem, List, PageHeader, ScreenContainer } from "../../components";

import i18n from "../../i18n";

const NewMatch = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Button
      mode="contained"
      compact
      uppercase={false}
      style={{ marginRight: 10 }}
      labelStyle={{
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 12,
      }}
      icon="plus-thick"
      color={colors.purple.sixth}
      onPress={() =>
        navigation.navigate("Modals", {
          screen: "CallScreen",
        })
      }
    >
      {i18n.t("newMatch")}
    </Button>
  );
};

export default Calls = ({ navigation }) => {
  const theme = useTheme();
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
        date: new Date() - Math.floor(Math.random() * 100 * 100000000),
        country: "br",
        duration: Math.floor(Math.random() * (10000000 - 1000 + 1) + 1000),
      }))
  );

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
            screen: "ProfileModal",
            params: { user: item },
          })
        }
      />
    );
  };

  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("callHistory")} sideActions={[NewMatch]} />
      <List
        style={{
          marginTop: 0,
          marginBottom: -insets.bottom,
        }}
        theme={theme}
        data={calls.sort((a, b) => b.date - a.date)}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={<View style={{ height: 20 }}></View>}
      />
    </ScreenContainer>
  );
};
