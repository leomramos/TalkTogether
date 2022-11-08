import React from "react";
import { FlatList, View } from "react-native";
import { IconButton, TouchableRipple, useTheme } from "react-native-paper";
import { CustomText, Row, UserAvatar } from "../";

export const RequestsOverlay = ({ requests, setRequests, navigation }) => {
  const { colors, typography } = useTheme();

  const renderRequest = ({ item }) => (
    <TouchableRipple
      onPress={() =>
        navigation.navigate("Modals", {
          screen: "ProfileScreen",
          params: { user: item },
        })
      }
    >
      <Row
        style={{
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Row>
          <UserAvatar
            size={35}
            flag="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.opovo.com.br%2F_midias%2Fjpg%2F2020%2F10%2F05%2F750x500%2F1_bandeira_do_brasil_300dpi-13718529.jpg&f=1&nofb=1&ipt=aedc272207e3b366ad03dd290a11199c384cb1c0885e5355c7f23d5bd4e8a86a&ipo=images"
          />
          <CustomText
            type={typography.popUp}
            color={colors.gray.ninth}
            style={{ marginRight: 5, marginLeft: 10, maxWidth: 100 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </CustomText>
        </Row>
        <Row style={{ marginLeft: 5 }}>
          <IconButton
            icon="close"
            color={colors.aux.cancel}
            size={20}
            onPress={() =>
              setRequests(requests.filter(req => req._id !== item._id))
            }
          />
          <IconButton
            icon="check"
            color={colors.aux.confirm}
            size={20}
            style={{ marginLeft: 0, marginRight: 0 }}
            onPress={() =>
              setRequests(requests.filter(req => req._id !== item._id))
            }
          />
        </Row>
      </Row>
    </TouchableRipple>
  );

  return (
    <FlatList
      style={{ maxHeight: 300 }}
      data={requests}
      renderItem={renderRequest}
      keyExtractor={item => item._id}
    />
  );
};

export const SortOverlay = ({ sort, setSort, sorts }) => {
  const { colors } = useTheme();
  return (
    <Row>
      {Object.entries(sorts).map(([s, { icon, extra, defaultOrder }]) => (
        <View key={`sort-${s}`}>
          <IconButton
            style={{
              margin: 0,
              marginLeft: 0,
              marginRight: 5,
            }}
            icon={icon}
            color={sort.by === s ? colors.gray.ninth : colors.gray.sixth}
            size={25}
            onPress={() => setSort({ by: s, order: defaultOrder })}
          />
          {extra}
        </View>
      ))}
      <IconButton
        icon={sort.order === 1 ? "sort-descending" : "sort-ascending"}
        color={colors.gray.ninth}
        size={15}
        style={{ marginLeft: 10, marginRight: 0 }}
        onPress={() => setSort({ by: sort.by, order: -sort.order })}
      />
    </Row>
  );
};
