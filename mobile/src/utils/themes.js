import { DefaultTheme } from "react-native-paper";

const common = {
  ...DefaultTheme,
  roundness: 5,
  screen: {
    padding: {
      left: 20,
      right: 0,
    },
  },
  typography: {
    tab: {
      title: {
        font: "Inter_700Bold",
        size: {
          number: 26,
          unit: "px",
        },
      },
    },
    input: {
      font: "Inter_500Medium",
      size: {
        number: 14,
        unit: "px",
      },
    },
    button: {
      font: "Inter_500Medium",
      size: {
        number: 12,
        unit: "px",
      },
    },
    overlay: {
      title: {
        font: "Inter_600SemiBold",
        size: {
          number: 16,
          unit: "px",
        },
      },
      footer: {
        font: "Inter_600SemiBold",
        size: {
          number: 14,
          unit: "px",
        },
      },
    },
    label: {
      name: {
        font: "Inter_600SemiBold",
        size: {
          number: 16,
          unit: "px",
        },
      },
      sent: {
        font: "Inter_400Regular",
        size: {
          number: 14,
          unit: "px",
        },
      },
    },
    message: {
      preview: {
        font: "Inter_400Regular",
        size: {
          number: 14,
          unit: "px",
        },
      },
      badge: {
        font: "Inter_700Bold",
        size: {
          number: 9,
          unit: "px",
        },
      },
    },
    menus: {
      badge: {
        font: "Inter_700Bold",
        size: {
          number: 6,
          unit: "px",
        },
      },
    },
    popUp: {
      font: "Inter_600SemiBold",
      size: {
        number: 10,
        unit: "px",
      },
    },
    chat: {
      name: {
        font: "Inter_600SemiBold",
        size: {
          number: 18,
          unit: "px",
        },
      },
      status: {
        font: "Inter_600SemiBold",
        size: {
          number: 12,
          unit: "px",
        },
      },
    },
  },
  colors: {
    ...DefaultTheme.colors,
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
    aux: {
      confirm: "#26A524",
      cancel: "#7D2626",
    },
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
      first: "#181820",
      second: "#21212B",
      third: "#272732",
      fourth: "#292839",
      fifth: "#414052",
      sixth: "#76767C",
      seventh: "#909095",
      eighth: "#CECED0",
      ninth: "#FDFDFD",
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
