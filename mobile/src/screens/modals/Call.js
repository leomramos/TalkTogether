import { Icon } from "@react-native-material/core";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { CustomText, Row, UserAvatar } from "../../components/";

import i18n from "../../i18n";

export default Call = ({ route, navigation }) => {
  const { screen, colors, typography } = useTheme();
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: screen.padding.left,
        }}
      >
        <IconButton
          icon="chevron-down"
          color={colors.gray.sixth}
          size={30}
          style={{ position: "absolute", top: 0, left: -screen.padding.left }}
          onPress={navigation.goBack}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
          }}
        >
          <UserAvatar
            flag="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.opovo.com.br%2F_midias%2Fjpg%2F2020%2F10%2F05%2F750x500%2F1_bandeira_do_brasil_300dpi-13718529.jpg&f=1&nofb=1&ipt=aedc272207e3b366ad03dd290a11199c384cb1c0885e5355c7f23d5bd4e8a86a&ipo=images"
            size={150}
          />
          <View style={{ marginVertical: 10, alignItems: "center" }}>
            <CustomText
              type={typography.label.call.name}
              color={colors.gray.ninth}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Username
            </CustomText>
            <CustomText
              type={typography.label.call.time}
              color={colors.gray.eighth}
              style={{ marginVertical: 10 }}
            >
              12:34:56
            </CustomText>
          </View>
          <Row
            style={{
              marginVertical: 50,
            }}
          >
            <CustomText
              type={typography.label.call.language}
              color={colors.gray.seventh}
            >
              English
            </CustomText>
            <Icon
              name="swap-horizontal"
              size={30}
              color={colors.gray.seventh}
              style={{
                marginHorizontal: 10,
              }}
            />
            <CustomText
              type={typography.label.call.language}
              color={colors.gray.seventh}
            >
              Português
            </CustomText>
          </Row>
        </View>
        <Row style={{ marginVertical: 50 }}>
          <IconButton
            icon={muted ? "microphone-off" : "microphone"}
            onPress={() => setMuted(!muted)}
            color={colors.gray.seventh}
            size={40}
            style={{
              backgroundColor: colors.gray.first,
            }}
          />
          <IconButton
            icon="phone-hangup"
            onPress={() => {}}
            color={colors.aux.hangup}
            size={40}
            style={{
              backgroundColor: colors.gray.first,
              marginHorizontal: 15,
            }}
          />
          <IconButton
            icon={deafened ? "volume-off" : "volume-high"}
            onPress={() => setDeafened(!deafened)}
            color={colors.gray.seventh}
            size={40}
            style={{
              backgroundColor: colors.gray.first,
            }}
          />
        </Row>
      </View>
      {/* <PageHeader title={i18n.t("profile")} goBack={navigation.goBack} />
      <UserProfile name={route.params && route.params.user.name} /> */}
    </ScreenContainer>
  );
};
