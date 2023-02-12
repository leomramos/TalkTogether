import { API_URL } from "@env";
import { useKeyboard } from "@react-native-community/hooks";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { useSocket, useUser, useWarning } from "../../../App";
import {
  ChatItem,
  CustomInput,
  List,
  MatchModal,
  OnlineIcon,
  OverlayMenu,
  PageHeader,
  Row,
  ScreenContainer,
} from "../../components";
import { RequestsOverlay, SortOverlay } from "../../components/Chats";

import i18n from "../../i18n";

const sorts = {
  name: {
    icon: "alphabetical-variant",
    defaultOrder: 1,
    sort: (a, b, order) =>
      order *
      (String(a.name).localeCompare(String(b.name), undefined, {
        ignorePunctuation: true,
        sensitivity: "base",
      }) || sorts["date"].sort(a, b, -1)),
  },
  date: {
    icon: "calendar",
    defaultOrder: -1,
    sort: (a, b, order) => order * (a.messages[0].sent - b.messages[0].sent),
  },
  status: {
    icon: "account-circle",
    defaultOrder: -1,
    sort: (a, b, order) =>
      order *
      (Number(a.online) - Number(b.online) || sorts["date"].sort(a, b, 1)),
    extra: <OnlineIcon sortIcon />,
  },
};

const PendingRequests = ({ requests, setRequests }) => {
  const navigation = useNavigation();

  return (
    <OverlayMenu
      title={i18n.t("chatRequests")}
      icon="account-multiple"
      iconSize={20}
      badge={requests.length < 10 ? requests.length : "9+"}
      topSpacing={40}
      content={
        <RequestsOverlay
          requests={requests}
          setRequests={setRequests}
          navigation={navigation}
        />
      }
      // footer={i18n.t("clear")}
      // footerAction={() => setSort(defaultSort)}
    />
  );
};

export default Chats = ({ navigation }) => {
  const { user, profile } = useUser();
  const theme = useTheme();

  const { socket, socketConnect, online, setOnline } = useSocket();
  const { setWarning } = useWarning();
  const [socketEventsAdded, setSocketEventsAdded] = useState(false);

  const [matchList, setMatchList] = useState([]);

  const checkOnline = user => online.indexOf(user) !== -1;

  useEffect(() => {
    socketConnect();
  }, []);

  const addSocketEvents = () => {
    socket.on("connectionSuccessful", onlineUsers => {
      setOnline(onlineUsers);
    });

    socket.on("userConnected", onlineUsers => {
      setOnline(onlineUsers);
    });
    socket.on("userDisconnected", onlineUsers => {
      setOnline(onlineUsers);
    });

    socket.on("quickMatchJoined", _ => {
      setQuickChatEnabled(true);
    });
    socket.on("quickMatchLeft", _ => {
      setQuickChatEnabled(false);
    });
    socket.on("quickMatchSearched", list => {
      list.length === 0
        ? setWarning(i18n.t("noUsersFound"))
        : setMatchList(list);
    });

    socket.on("newMessage", _ => {
      fetchChats();
    });

    setSocketEventsAdded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      socket.id && !socketEventsAdded && addSocketEvents();
    }, 1000);
  }, [socket.connected]);

  useEffect(() => {
    socket.id &&
      user._id &&
      socket.emit("changedLanguages", {
        id: user._id,
        languages: profile.languages,
      });
  }, [profile.languages.length]);

  const keyboard = useKeyboard();

  useEffect(
    _ =>
      keyboard.keyboardShown
        ? navigation.setOptions({
            tabBarStyle: { ...navigation.tabBarStyle, display: "none" },
          })
        : navigation.setOptions({
            tabBarStyle: {
              backgroundColor: theme.colors.gray.first,
              paddingVertical: 5,
              display: "flex",
            },
          }),
    [keyboard.keyboardShown]
  );

  const requestsAmount = 0;
  const [requests, setRequests] = useState(
    Array(requestsAmount)
      .fill()
      .map((_, k) => ({
        _id: k,
        name: Array(Math.floor(Math.random() * (10 - 3 + 1) + 3))
          .fill()
          .map(_ => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
          .join(""),
        avatar: {
          style: "Number",
          color: "String",
        },
      }))
  );

  const PendingReqs = () => (
    <PendingRequests requests={requests} setRequests={setRequests} />
  );

  const defaultSort = { by: "date", order: -1 };
  const insets = useSafeAreaInsets();
  const [fabOpen, setFabOpen] = useState(false);
  const [quickChatEnabled, setQuickChatEnabled] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => setFabOpen(false));

    return unsubscribe;
  }, [navigation]);

  const [chats, setChats] = useState({});
  const fetchChats = () => {
    axios
      .post(`${API_URL}/chats/list`, { userId: user._id })
      .then(res =>
        setChats(
          res.data.map(chat => {
            const otherUser = chat.profiles.find(u => u.userId !== user._id);
            return {
              ...chat,
              online: checkOnline(otherUser.userId),
            };
          })
        )
      )
      .catch(e => {
        throw e;
      });
  };
  useEffect(fetchChats, []);

  useEffect(() => {
    if (chats.length > 0) {
      const chatsUpdate = chats.map(chat => ({
        ...chat,
        online: checkOnline(
          chat.profiles.find(u => u.userId !== user._id).userId
        ),
      }));
      setChats(chatsUpdate);
    }
  }, [online]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(defaultSort);

  const sortChats = (a, b) => sorts[sort.by].sort(a, b, sort.order);

  const renderItem = ({ item }) => {
    const otherUser = item.profiles.find(u => u.userId !== user._id);
    return (
      <ChatItem
        name={otherUser.name}
        avatar={otherUser.avatar.style}
        color={otherUser.avatar.color}
        offline={!item.online}
        lastMessage={item.messages[item.messages.length - 1]}
        // unread={item.unread}
        handlePress={() =>
          navigation.navigate("Modals", {
            screen: "ChatModal",
            params: { chatId: item._id },
          })
        }
        handleAvatarPress={() =>
          navigation.navigate("Modals", {
            screen: "ProfileModal",
            params: { user: item.profiles.find(u => u.userId !== user._id) },
          })
        }
      />
    );
  };

  const getAction = (
    icon,
    label = "",
    onPress,
    color = "",
    background = ""
  ) => ({
    icon,
    label: i18n.t(label),
    onPress,
    color: color || theme.colors.gray.eighth,
    style: {
      backgroundColor: background || theme.colors.gray.third,
    },
    labelTextColor: color || theme.colors.gray.eighth,
    labelStyle: {
      backgroundColor: background || theme.colors.gray.third,
    },
  });

  const fabActions = [
    getAction(
      quickChatEnabled ? "access-point" : "access-point-off",
      quickChatEnabled ? "quickChatEnabled" : "quickChatDisabled",
      socket.connected
        ? () =>
            socket.emit(
              `quickMatch${quickChatEnabled ? "Leave" : "Join"}`,
              user._id
            )
        : () => setWarning(i18n.t("unknownError"))
    ),
  ];

  quickChatEnabled &&
    fabActions.push(
      getAction("plus", "match", () =>
        socket.emit("quickMatchSearch", user._id)
      )
    );

  return (
    <ScreenContainer>
      <MatchModal
        userId={user._id}
        navigation={navigation}
        list={matchList}
        setList={setMatchList}
      />
      <PageHeader
        title={i18n.t("chats")}
        sideActions={requests.length > 0 ? [PendingReqs] : []}
      />
      <Row>
        <CustomInput
          dense
          value={search}
          setValue={setSearch}
          search={() => {}}
          style={{ flexGrow: 1 }}
        />
        <OverlayMenu
          title={i18n.t("sort")}
          icon="dots-vertical"
          content={<SortOverlay sort={sort} setSort={setSort} sorts={sorts} />}
          footer={i18n.t("clear")}
          footerAction={() => setSort(defaultSort)}
        />
      </Row>
      <List
        style={{
          marginBottom: -insets.bottom,
        }}
        theme={theme}
        data={
          chats.length > 0
            ? chats
                .filter(
                  el =>
                    el.profiles
                      .find(u => u.userId !== user._id)
                      .name?.search(new RegExp(search, "i")) !== -1
                )
                .sort(sortChats)
            : null
        }
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={<View style={{ height: 90 }}></View>}
        ListEmptyComponent={
          <Row style={{ flex: 1, justifyContent: "center" }}>
            <CustomText
              type={theme.typography.label.empty}
              color={theme.colors.gray.seventh}
              style={{
                textAlign: "center",
                maxWidth: 250,
              }}
            >
              {i18n.t("noChatsFound")}
            </CustomText>
          </Row>
        }
      />
      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? "close" : "plus"}
        color={theme.colors.gray.ninth}
        fabStyle={{
          backgroundColor: theme.colors.purple.sixth,
        }}
        onStateChange={_ => {}}
        onPress={() => setFabOpen(!fabOpen)}
        actions={fabActions}
      />
    </ScreenContainer>
  );
};
