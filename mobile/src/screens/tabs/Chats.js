import React, { useEffect, useState } from "react";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChatItem,
  CustomInput,
  CustomText,
  List,
  OnlineIcon,
  OverlayMenu,
  PageHeader,
} from "../../components";
import { RequestsOverlay, SortOverlay } from "../../components/Chats";
import ScreenContainer from "../../components/ScreenContainer";
import ModalStack from "../../navigators/ModalNavigator";

import { Row } from "../../components";
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
    sort: (a, b, order) => order * (a.lastMessage.sent - b.lastMessage.sent),
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

const PendingRequests = () => {
  const requestsAmount = 5;
  const [requests, setRequests] = useState(
    Array(requestsAmount)
      .fill()
      .map((_, k) => ({
        _id: k,
        name: Array(Math.floor(Math.random() * (150 - 3 + 1) + 3))
          .fill()
          .map(_ => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
          .join(""),
        avatar: {
          style: "Number",
          color: "String",
        },
      }))
  );

  return (
    <OverlayMenu
      title={i18n.t("chatRequests")}
      icon="account-multiple"
      iconSize={20}
      badge={1}
      topSpacing={40}
      content={<RequestsOverlay requests={requests} />}
      // footer={i18n.t("clear")}
      // footerAction={() => setSort(defaultSort)}
    />
  );
};

export default Chats = ({ navigation }) => {
  const defaultSort = { by: "date", order: -1 };
  const insets = useSafeAreaInsets();
  const [fabOpen, setFabOpen] = useState(false);
  const [quickChatEnabled, setQuickChatEnabled] = useState(false);
  const [quickChatSearching, setQuickChatSearching] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => setFabOpen(false));

    return unsubscribe;
  }, [navigation]);

  const chatsAmount = 15;
  const [chats, setChats] = useState(
    Array(chatsAmount)
      .fill()
      .map((_, k) => ({
        _id: k,
        name: Array(Math.floor(Math.random() * (4 - 2 + 1) + 3))
          .fill()
          .map(
            _ =>
              Array(Math.floor(Math.random() * (8 - 2 + 1) + 2))
                .fill()
                .map(_ =>
                  String.fromCharCode(97 + Math.floor(Math.random() * 26))
                )
                .join("") +
              String.fromCharCode(97 + Math.floor(Math.random() * 26))
          )
          .join(" "),
        online: Math.random() < 0.5,
        lastMessage: {
          body: Array(Math.floor(Math.random() * (15 - 3 + 1) + 3))
            .fill()
            .map(
              _ =>
                Array(Math.floor(Math.random() * (8 - 2 + 1) + 2))
                  .fill()
                  .map(_ =>
                    String.fromCharCode(97 + Math.floor(Math.random() * 26))
                  )
                  .join("") +
                String.fromCharCode(97 + Math.floor(Math.random() * 26))
            )
            .join(" "),
          sent: new Date() - Math.floor(Math.random() * 100 * 10000),
        },
        unread: Math.floor(Math.random() * Math.random() * 10),
      }))
  );
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(defaultSort);

  const sortChats = (a, b) => sorts[sort.by].sort(a, b, sort.order);

  const renderItem = ({ item }) => {
    return (
      <ChatItem
        name={item.name}
        offline={!item.online}
        lastMessage={item.lastMessage}
        unread={item.unread}
        handlePress={() =>
          navigation.navigate("Modals", {
            screen: "ChatScreen",
            params: { user: item },
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
      () => setQuickChatEnabled(!quickChatEnabled)
    ),
  ];

  quickChatEnabled &&
    fabActions.push(
      getAction("plus", "match", () =>
        setQuickChatSearching(!quickChatSearching)
      )
    );

  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("chats")} sideActions={[PendingRequests]} />
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
        style={{ marginBottom: -insets.bottom, paddingBottom: 30 }}
        theme={theme}
        data={chats
          .filter(el => el.name.search(new RegExp(search, "i")) !== -1)
          .sort(sortChats)}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={
          <CustomText
            type={theme.typography.input}
            color={theme.colors.gray.fifth}
            style={{ height: 90 }}
          >
            asdsa
          </CustomText>
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
      <ModalStack />
    </ScreenContainer>
  );
};
