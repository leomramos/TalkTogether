import { Icon } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { Chip, Circle, CustomText, Row, UserAvatar } from "../../components";

import i18n from "../../i18n";

const UserContainer = Styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Color = Styled.View`
  width: 35px;
  height: 30px;
  background-color: ${({ color }) => color};
`;

export default UserProfile = ({
  name = "",
  avatar = null,
  setAvatar = () => {},
  avatarColor = null,
  setAvatarColor = () => {},
  setName = () => {},
  about = "",
  setAbout = () => {},
  langs = [],
  setLangs = () => {},
  editable = false,
  editingPic = false,
  setEditingPic = () => {},
}) => {
  const { typography, colors } = useTheme();
  const levelsOrder = ["native", "advanced", "intermediate", "beginner"];

  return (
    <View
      style={{
        flex: 1,
        paddingRight: 20,
      }}
    >
      <UserContainer>
        <UserAvatar
          plain
          color={avatarColor}
          size={75}
          onPress={
            editable &&
            (!editingPic
              ? () => setEditingPic(true)
              : () => setEditingPic(false))
          }
          editingPic={editingPic}
          editable={editable}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          {editingPic ? (
            <View>
              <ScrollView horizontal style={{ paddingBottom: 10 }}>
                {Object.entries(colors.avatar).map(c => (
                  <View
                    key={`color-picker-${c[0]}`}
                    style={{
                      borderRadius: 100,
                      overflow: "hidden",
                      marginLeft: 10,
                    }}
                  >
                    <TouchableRipple
                      onPress={() => console.log(c[0])}
                      borderless
                    >
                      <Circle size={35} color={c[1]} />
                    </TouchableRipple>
                  </View>
                ))}
              </ScrollView>
              <ScrollView
                horizontal
                style={{ marginTop: 10, paddingBottom: 10 }}
              >
                {Object.entries(colors.avatar).map(c => (
                  <TouchableRipple
                    key={`color-picker-${c[0]}`}
                    onPress={() => setAvatarColor(c[0])}
                    style={{ marginLeft: 10 }}
                    borderless
                  >
                    <Color color={c[1]} />
                  </TouchableRipple>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={{ marginLeft: 10, marginBottom: 30 }}>
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
          )}
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
          <View>
            {Object.entries(langs)
              .sort(
                (a, b) => levelsOrder.indexOf(a[0]) - levelsOrder.indexOf(b[0])
              )
              .map(
                ([level, languages], i) =>
                  languages.length > 0 && (
                    <Row
                      key={`${level}-langs-list`}
                      style={{
                        marginBottom: 5,
                      }}
                    >
                      <Icon
                        name={`alpha-n-box`}
                        size={30}
                        color={colors.proficiency[level]}
                        style={{ marginRight: 5 }}
                      />
                      <ScrollView
                        horizontal
                        onResize={() => console.log("a")}
                        style={{ paddingBottom: 5 }}
                      >
                        {languages.map(language => {
                          return (
                            <Chip
                              key={`${language}-chip`}
                              text={language}
                              textStyle={typography.chip}
                              color={
                                level === "beginner"
                                  ? colors.gray.second
                                  : colors.gray.ninth
                              }
                              background={colors.proficiency[level]}
                              remove={
                                editable &&
                                (() =>
                                  setLangs(
                                    Object.fromEntries(
                                      Object.entries(langs).map(
                                        ([lvl, lng]) => [
                                          lvl,
                                          lng.filter(
                                            el =>
                                              level !== lvl || el !== language
                                          ),
                                        ]
                                      )
                                    )
                                  ))
                              }
                            />
                          );
                        })}
                      </ScrollView>
                    </Row>
                  )
              )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
