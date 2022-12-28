import Constants from "expo-constants";
import React, { useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import {
  CustomInput,
  CustomText,
  NavigateBack,
  Row,
  ScreenContainer,
} from "../../components";

import { Countries } from "../../../public/world_data.json";

import i18n from "../../i18n";

export default Login = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());

  const handleLogin = () => {
    Keyboard.dismiss();
    navigation.navigate("Tabs");
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
              data={Countries.map(c => c.name)}
              search
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
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
            onPress={handleLogin}
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
