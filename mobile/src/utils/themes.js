import { DefaultTheme } from "react-native-paper";

const common = {
  ...DefaultTheme,
  roundness: 5,
  user: {
    avatar: {
      white: "#D9D9D9",
      gray: "#9D9B9B",
      salmon: "#A39090",
      yellow: "#ABA496",
      green: "#9DAB96",
      cyan: "#96ABAA",
      blue: "#969BAB",
      violet: "#A796AB",
      orange: "#AB9696",
    },
  },
  screen: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  typography: {
    tab: {
      title: {
        font: "Inter_700Bold",
        size: "26px",
      },
    },
    input: {
      font: "Inter_500Medium",
      size: "14px",
    },
    overlay: {
      title: {
        font: "Inter_600SemiBold",
        size: "16px",
      },
      footer: {
        font: "Inter_600SemiBold",
        size: "14px",
      },
    },
  },
  colors: {
    ...DefaultTheme.colors,
  },
};

const darkTheme = {
  ...common,
  dark: true,
  colors: {
    ...common.colors,
    purple: {
      first: "#10002B",
      second: "#240046",
      third: "#3C096C",
      fourth: "#5A189A",
      fifth: "#7B2CBF",
      sixth: "#9D4EDD",
      seventh: "#C77DFF",
      eighth: "#E0AAFF",
    },
    gray: {
      first: "#FDFDFD",
      second: "#CECED0",
      third: "#909095",
      fourth: "#76767C",
      fifth: "#414052",
      sixth: "#292839",
      seventh: "#272732",
      eighth: "#21212B",
      ninth: "#181820",
    },
  },
};

export default Theme = {
  get: t => {
    switch (t) {
      case "dark":
        return darkTheme;
    }
  },
};
