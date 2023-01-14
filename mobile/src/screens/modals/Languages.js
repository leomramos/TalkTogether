import { API_URL } from "@env";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { useQuery } from "react-query";
import { useUser, useWarning } from "../../../App";
import {
  CustomText,
  NavigateBack,
  Row,
  ScreenContainer,
} from "../../components";

import i18n from "../../i18n";

export default Languages = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const { setWarning } = useWarning();
  const { user, setUser } = useUser();

  const languages = useQuery("listLanguages", () =>
    axios
      .post(`${API_URL}/languages`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        throw e;
      })
  );

  const proficiencies = [
    { label: i18n.t("native"), proficiency: 4 },
    { label: i18n.t("advanced"), proficiency: 3 },
    { label: i18n.t("intermediate"), proficiency: 2 },
    { label: i18n.t("beginner"), proficiency: 1 },
  ];

  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  const saveLanguage = () => {
    const languages = user.languages;
    languages.push({ languageId: language._id, proficiency });
    setUser({ ...user, languages });
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("addLanguage")} goBack={navigation.goBack} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingRight: screen.padding.left + 10,
          paddingLeft: 10,
          paddingTop: 35,
          overflow: "hidden",
        }}
      >
        <ScrollView
          style={{
            width: "100%",
          }}
          componentContainerStyle={{ justifyContent: "flex-end" }}
        >
          <View style={{ marginBottom: 25 }}>
            <CustomText
              type={typography.auth.label}
              color={colors.gray.eighth}
              style={{ marginBottom: 15 }}
            >
              {i18n.t("selectLanguage")}
            </CustomText>
            <SelectDropdown
              data={languages.data || []}
              search
              disableAutoScroll
              defaultButtonText={i18n.t("selectOne")}
              onSelect={selectedItem => {
                setLanguage(selectedItem);
              }}
              buttonStyle={{
                backgroundColor: colors.gray.first,
              }}
              buttonTextStyle={{ color: colors.gray.ninth }}
              dropdownStyle={{
                backgroundColor: colors.gray.third,
              }}
              rowTextStyle={{
                color: colors.gray.ninth,
              }}
              searchInputStyle={{
                backgroundColor: colors.gray.second,
              }}
              searchInputTxtColor={colors.gray.eighth}
              searchPlaceholder={i18n.t("search") + "..."}
              buttonTextAfterSelection={selectedItem => selectedItem.name}
              rowTextForSelection={item => item.name}
            />
          </View>
          <View style={{ marginBottom: 25 }}>
            <CustomText
              type={typography.auth.label}
              color={colors.gray.eighth}
              style={{ marginBottom: 15 }}
            >
              {i18n.t("selectProficiency")}
            </CustomText>
            <SelectDropdown
              data={proficiencies}
              disableAutoScroll
              defaultButtonText={i18n.t("selectOne")}
              onSelect={selectedItem => {
                setProficiency(selectedItem);
              }}
              buttonStyle={{
                backgroundColor: colors.gray.first,
              }}
              buttonTextStyle={{ color: colors.gray.ninth }}
              dropdownStyle={{
                backgroundColor: colors.gray.third,
              }}
              rowTextStyle={{
                color: colors.gray.ninth,
              }}
              searchInputStyle={{
                backgroundColor: colors.gray.second,
              }}
              buttonTextAfterSelection={selectedItem => selectedItem.label}
              rowTextForSelection={item => item.label}
            />
          </View>

          <Button
            uppercase={false}
            contained
            color={colors.gray.ninth}
            contentStyle={{ backgroundColor: colors.purple.fifth }}
            onPress={saveLanguage}
            style={{ marginTop: 17 }}
          >
            <CustomText
              type={typography.auth.button}
              color={colors.gray.ninth}
              style={{ textTransform: "capitalize" }}
            >
              {i18n.t("add")}
            </CustomText>
          </Button>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
