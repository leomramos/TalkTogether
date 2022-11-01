import { Icon } from "@react-native-material/core";
import { TouchableRipple } from "react-native-paper";
import CustomText from "./CustomText";
import { Row } from "./Helpers";

export default Chip = ({
  text = "",
  textStyle = {},
  remove = null,
  color = "",
  background = "",
}) => {
  return (
    <TouchableRipple
      style={{
        backgroundColor: background,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginRight: 8,
      }}
      onPress={remove}
    >
      <Row>
        <CustomText type={textStyle} color={color}>
          {text}
        </CustomText>
        {remove && (
          <Icon
            name="close-thick"
            color={color}
            size={textStyle.size.number - 2}
            style={{ marginLeft: 5 }}
          />
        )}
      </Row>
    </TouchableRipple>
  );
};
