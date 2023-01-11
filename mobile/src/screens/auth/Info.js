import { API_URL } from "@env";
import axios from "axios";
import Constants from "expo-constants";
import * as Localization from "expo-localization";
import React, { useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import DatePicker from "react-native-date-picker";
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

export default Login = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const { setWarning } = useWarning();
  const { user, setUser } = useUser();

  const countries = useQuery("listCountries", () =>
    axios
      .post(`${API_URL}/countries`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        throw e;
      })
  );

  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());

  const finishRegister = (country, date) => {
    axios
      .put(`${API_URL}/users/register`, {
        user: {
          ...user,
          language: Localization.locale.substring(0, 2),
          birthday: date,
        },
        country: country._id,
      })
      .then(res => {
        setUser(res.data);
        navigation.navigate("Tabs");
      })
      .catch(e => {
        throw e;
      });
  };

  console.log(countries);

  const handleRegister = () => {
    Keyboard.dismiss();

    country
      ? finishRegister(country, date)
      : setWarning(i18n.t("selectCountryError"));
  };

  return (
    <ScreenContainer>
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
          <Row style={{ marginBottom: 15 }}>
            <NavigateBack action={navigation.goBack} marginLeft={0} />
            <CustomText type={typography.auth.info} color={colors.gray.ninth}>
              {i18n.t("fillYourInformation")}
            </CustomText>
          </Row>

          <View style={{ marginBottom: 25 }}>
            <CustomText
              type={typography.auth.label}
              color={colors.gray.eighth}
              style={{ marginBottom: 15 }}
            >
              {i18n.t("selectCountry")}
            </CustomText>
            <SelectDropdown
              data={countries.data || []}
              search
              disableAutoScroll
              defaultButtonText={i18n.t("selectOne")}
              onSelect={selectedItem => {
                setCountry(selectedItem);
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

          {Constants.appOwnership !== "expo" && (
            <View style={{ marginBottom: 25 }}>
              <CustomText
                type={typography.auth.label}
                color={colors.gray.eighth}
                style={{ marginBottom: 15 }}
              >
                {i18n.t("selectBirthday")}
              </CustomText>
              <DatePicker
                mode="date"
                date={date}
                minimumDate={new Date("1900-01-02")}
                maximumDate={new Date()}
                onDateChange={setDate}
                androidVariant="iosClone"
                textColor="#ffffff"
                fadeToColor="none"
              />
            </View>
          )}

          <Button
            uppercase={false}
            contained
            color={colors.gray.ninth}
            contentStyle={{ backgroundColor: colors.purple.fifth }}
            onPress={handleRegister}
            style={{ marginTop: 17 }}
          >
            <CustomText
              type={typography.auth.button}
              color={colors.gray.ninth}
              style={{ textTransform: "capitalize" }}
            >
              {i18n.t("signUp")}
            </CustomText>
          </Button>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
