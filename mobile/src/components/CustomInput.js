import { useState } from "react";
import { TextInput, useTheme } from "react-native-paper";

import i18n from "../i18n";

export default CustomInput = ({
  value = "",
  setValue = () => {},
  label = "",
  placeholder = "",
  icon = "",
  action = () => {},
  search = false,
  highlight = true,
  keyboard = "default",
  bottomSpace = 0,
  style = {},
  mode = "outlined",
  secureTextEntry = false,
  restriction = _ => true,
  editable = true,
  ...props
}) => {
  const { colors, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      editable={editable}
      secureTextEntry={secureTextEntry}
      style={{
        ...style,
        backgroundColor: colors.gray.third,
        flexGrow: 1,
        fontFamily: typography.input.font,
        fontSize: typography.input.size.number,
        marginBottom: bottomSpace,
        opacity: editable ? 1 : 0.3,
      }}
      mode={mode}
      label={!search && label}
      placeholder={search ? i18n.t("search") : placeholder || label}
      placeholderTextColor={colors.gray.sixth}
      value={value}
      onChangeText={text => {
        if (restriction(text)) {
          setValue(text);
          search && search(text);
        }
      }}
      keyboardType={search ? "web-search" : keyboard}
      selectionColor={colors.purple.sixth}
      outlineColor={value === "" ? "transparent" : colors.purple.fourth}
      activeOutlineColor={highlight ? colors.purple.fourth : "transparent"}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      right={
        icon && (
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
        )
      }
      theme={{
        colors: {
          text: colors.gray.eighth,
          placeholder: colors.gray.sixth,
        },
      }}
      {...props}
    />
  );
};
