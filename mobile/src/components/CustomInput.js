import { Icon } from "@react-native-material/core";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import Styled from "styled-components/native";

import i18n from "../i18n";

export default CustomInput = ({
  value = "",
  setValue = () => {},
  label = "",
  icon = "",
  action = () => {},
  search = false,
  dense = false,
  keyboard = "default",
}) => {
  const { colors, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      dense={dense}
      style={{
        backgroundColor: colors.gray.third,
        flexGrow: 1,
        fontFamily: typography.input.font,
        fontSize: typography.input.size.number,
      }}
      mode="outlined"
      label={!search && label}
      placeholder={search ? i18n.t("search") : label}
      value={value}
      onChangeText={text => {
        setValue(text);
        search && search(text);
      }}
      keyboardType={search ? "web-search" : keyboard}
      selectionColor={colors.purple.sixth}
      outlineColor={value === "" ? "transparent" : colors.purple.fourth}
      activeOutlineColor={colors.purple.fourth}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      right={
        <TextInput.Icon
          animated
          name={search ? (value !== "" ? "close" : "magnify") : icon}
          size={search ? (value !== "" ? 15 : 25) : 20}
          color={
            search && value !== ""
              ? colors.gray.sixth
              : isFocused
              ? colors.purple.sixth
              : colors.gray.eighth
          }
          onPress={search ? () => setValue("") : action}
        />
      }
      theme={{
        colors: {
          text: colors.gray.eighth,
          placeholder: colors.gray.sixth,
        },
      }}
    />
  );
};
