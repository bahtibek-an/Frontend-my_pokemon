const theme = {
  color: {
    background: "#f4f4f4",
    "ui-1": "#ffffff",
    "ui-2": "#f4f4f4",
    "ui-3": "#e0e0e0",
    "ui-4": "#8d8d8d",
    "ui-5": "#161616",
    "text-1": "#161616",
    "text-2": "#525252",
    "text-3": "#a8a8a8",
    "text-4": "#ffffff",
    "text-5": "#6f6f6f",
    "text-error": "#c23934",
    "interactive-1": "#0f62fe",
    "interactive-1-hover": "#0353e9",
    "interactive-1-active": "#002d9c",
    transparent: "transparent",
  },
  shadow: {
    100: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    200: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    300: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    400: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
    500: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
  },
  spacing: {
    100: "0.125rem",
    200: "0.25rem",
    300: "0.5rem",
    400: "0.75rem",
    500: "1rem",
    600: "1.5rem",
    700: "3rem",
  },
  breakpoint: {
    mobile: "@media (min-width: 0px)",
    tablet: "@media (min-width: 768px)",
    desktop: "@media (min-width: 1024px)",
  },
  fontVariant: {
    label: {
      mobile: {
        fontSize: "1.25rem",
        lineHeight: "1.5em",
        fontFamily: "Rubik, sans-serif",
      },
      tablet: {
        fontSize: "1.5rem",
        lineHeight: "1.5em",
        fontFamily: "Rubik, sans-serif",
      },
    },
    heading: {
      mobile: {
        fontSize: "1.875rem",
        lineHeight: "1.5em",
        fontFamily: "Rubik, sans-serif",
      },
      tablet: {
        fontSize: "2rem",
        lineHeight: "1.5em",
        fontFamily: "Rubik, sans-serif",
      },
    },
    default: {
      mobile: {
        fontSize: "0.875rem",
        lineHeight: "1.5em",
        fontFamily: "Rubik, sans-serif",
      },
      tablet: {
        fontSize: "1rem",
        lineHeight: "1.5em",
        fontFamily: "Rubik, sans-serif",
      },
    },
  },
};

export default theme;
export interface ThemeProps {
  color: {
    background: string;
    "ui-1": string;
    "ui-2": string;
    "ui-3": string;
    "ui-4": string;
    "ui-5": string;
    "text-1": string;
    "text-2": string;
    "text-3": string;
    "text-4": string;
    "text-5": string;
    "text-error": string;
    "interactive-1": string;
    "interactive-1-hover": string;
    "interactive-1-active": string;
    transparent: string;
  };
  shadow: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
  };
  spacing: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
  };
  breakpoint: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  fontVariant: {
    label: {
      mobile: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
      };
      tablet: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
      };
    };
    heading: {
      mobile: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
      };
      tablet: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
      };
    };
    default: {
      mobile: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
      };
      tablet: {
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
      };
    };
  };
}
export type ThemeData = {
  theme: Partial<ThemeProps>;
};
