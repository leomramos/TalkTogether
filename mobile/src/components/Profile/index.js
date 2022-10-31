import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "../CustomText";

import i18n from "../../i18n";

const UserContainer = Styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default UserProfile = ({
  name = "",
  setName = () => {},
  about = "",
  setAbout = () => {},
  langs = [],
  setLangs = () => {},
  editable = false,
}) => {
  const { typography, colors } = useTheme();

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
            onBlur={() => setName(name.trim())}
            placeholder={editable ? i18n.t("username") : i18n.t("unknown")}
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
            editable={editable}
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
            placeholder={
              editable ? i18n.t("tellAboutYou") : i18n.t("emptyAbout")
            }
            style={{
              fontSize: typography.profile.about.size.number,
              color: colors.gray.eighth,
              maxWidth: "100%",
              marginBottom: 10,
              minHeight: 0,
            }}
            placeholderTextColor={colors.gray.seventh}
            selectionColor={colors.gray.sixth}
            activeOutlineColor={colors.gray.sixth}
            multiline
            maxLength={255}
            editable={editable}
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
          {/* <View>
            <Chip
              icon="information"
              onPress={() => console.log("Pressed")}
              style={{
                borderRadius: 0,
                backgroundColor: colors.proficiency.native,
              }}
              textStyle={{
                color: colors.gray.ninth,
              }}
            >
              Example Chip
            </Chip>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};
