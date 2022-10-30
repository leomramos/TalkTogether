import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "../CustomText";

import i18n from "../../i18n";

const UserContainer = Styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
  /* margin-left: -15px; */
`;

export default UserProfile = ({ route, navigation }) => {
  const { typography, colors } = useTheme();

  const [name, setName] = useState("User");
  const [about, setAbout] = useState(
    "Veniam exercitation tempor adipisicing sunt ex ea elit velit laborum irure reprehenderit minim Lorem aliqua. Laboris proident cupidatat aute laborum ea in minim deserunt labore in. Occaecat qui pariatur esse nostrud fugiat culpa et dolor occaecat."
  );

  return (
    <View
      style={{
        flex: 1,
        paddingRight: 20,
      }}
    >
      <UserContainer>
        <UserAvatar plain size={75} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <TextInput
            autocomplete="username"
            value={name}
            onChangeText={text => setName(text)}
            placeholder={i18n.t("username")}
            style={{
              fontSize: typography.profile.name.size.number,
              color: colors.gray.ninth,
              maxWidth: "100%",
              marginBottom: 10,
              textAlignVertical: "top",
            }}
            placeholderTextColor={colors.gray.seventh}
            selectionColor={colors.gray.sixth}
            maxLength={10}
            autoCorrect={false}
            // editable={false}
          />
          <CustomText
            type={typography.profile.about}
            color={colors.gray.seventh}
          >
            ★★★★★
          </CustomText>
        </View>
      </UserContainer>
      <ScrollView style={{ marginRight: -20, paddingRight: 20 }}>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <CustomText
            type={typography.profile.title}
            color={colors.gray.ninth}
            style={{ marginVertical: 20 }}
          >
            {i18n.t("about")}
          </CustomText>
          <TextInput
            value={about}
            onChangeText={text => setAbout(text)}
            onBlur={() => setAbout(about.trim())}
            placeholder={i18n.t("tellAboutYou")}
            style={{
              fontSize: typography.profile.about.size.number,
              color: colors.gray.eighth,
              maxWidth: "100%",
              marginBottom: 10,
              minHeight: 0,
              maxHeight: 2550,
            }}
            placeholderTextColor={colors.gray.seventh}
            selectionColor={colors.gray.sixth}
            activeOutlineColor={colors.gray.sixth}
            multiline
            // numberOfLines={15}
            maxLength={255}
            // editable={false}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <CustomText
            type={typography.profile.title}
            color={colors.gray.ninth}
            style={{ marginVertical: 20 }}
          >
            Languages
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};
