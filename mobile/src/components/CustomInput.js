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
  iconStyle = {},
  iconDisabled = false,
  setRef = null,
  ...props
}) => {
  const { colors, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      ref={setRef}
      editable={editable}
      secureTextEntry={secureTextEntry}
      style={{
        backgroundColor: colors.gray.third,
        flexGrow: 1,
        fontFamily: typography.input.font,
        fontSize: typography.input.size.number,
        marginBottom: bottomSpace,
        opacity: editable ? 1 : 0.3,
        ...style,
      }}
      mode={mode}
      label={!search && label}
      placeholder={search ? i18n.t("search") : placeholder || label}
      placeholderTextColor={colors.gray.sixth}
      value={value}
      onChangeText={text => {
        if (!restriction(text) && restriction(text.trim())) {
          text = text.trim();
        }
        setValue(text.trim());
        search && search(text.trim());
      }}
      keyboardType={search ? "web-search" : keyboard}
      selectionColor={colors.purple.sixth}
      outlineColor={
        value !== "" && highlight ? colors.purple.fourth : "transparent"
      }
      activeOutlineColor={highlight ? colors.purple.fourth : "transparent"}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      right={
        icon && (
          <TextInput.Icon
            animated
            disabled={iconDisabled}
            name={search ? (value !== "" ? "close" : "magnify") : icon}
            size={search ? (value !== "" ? 15 : 25) : 20}
            color={
              search && value !== ""
                ? colors.gray.sixth
                : isFocused
                ? highlight
                  ? colors.purple.sixth
                  : colors.gray.eighth
                : colors.gray.eighth
            }
            onPress={search ? () => setValue("") : action}
            style={iconStyle}
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
