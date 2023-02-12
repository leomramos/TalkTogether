import { API_URL } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { useSocket } from "../../../App";
import { List, PageHeader, ScreenContainer, UserItem } from "../../components";

import i18n from "../../i18n";

export default Users = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { socket } = useSocket();

  const users = useQuery("usersList", () =>
    axios
      .post(`${API_URL}/profiles/list`)
      .then(res => res.data)
      .catch(e => {
        throw e;
      })
  );

  const [socketEventsAdded, setSocketEventsAdded] = useState(false);

  const addSocketEvents = () => {
    socket.on("usersUpdated", _ => {
      users.refetch();
    });

    setSocketEventsAdded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      socket.id && !socketEventsAdded && addSocketEvents();
    }, 1000);
  }, [socket.connected]);

  const renderItem = ({ item }) => {
    return (
      <UserItem
        user={item}
        handleAvatarPress={() =>
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
      <PageHeader title={i18n.t("users")} />
      <List
        style={{
          marginTop: 0,
          marginBottom: -insets.bottom,
        }}
        theme={theme}
        data={users?.data?.sort(
          (a, b) =>
            b.userId?.role?.permLevel - a.userId?.role?.permLevel ||
            a.name?.localeCompare(b.name) ||
            a.createdAt - b.createdAt
        )}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={<View style={{ height: 20 }}></View>}
      />
    </ScreenContainer>
  );
};
