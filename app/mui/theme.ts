import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";
import { responsiveFontSizes } from "@mui/material";
const primary = {
  main: "#1E3A8A",
  dark: "#1A3275",
  light: "#6888DE",
  contrastText: "#FFF",
};
const secondary = {
  main: "#E2E8F0",
  dark: "#D7DFEA",
  light: "#F2F4F8",
  contrastText: "#292524",
};
let theme = createTheme({
  palette: {
    mode: "light",
    primary: primary,
    secondary: secondary,
  },
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "primary",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    accent: theme.palette.augmentColor({
      color: {
        main: "#EA580C",
      },
    }),
  },
  typography: {
    h1: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "3.4rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "5rem",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "6rem",
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: "6rem",
        fontWeight: "",
      },
    },
    h2: {
      [theme.breakpoints.up("xs")]: {
        fontSize: ".7rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: "2rem",
      },
    },
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: "large" },
              style: {
                "& .MuiButton-root": {
                  [theme.breakpoints.up("xs")]: {
                    fontSize: ".7rem",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: ".8rem",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: "1rem",
                  },
                  [theme.breakpoints.up("md")]: {
                    fontSize: "1.5rem",
                  },
                  [theme.breakpoints.up("xl")]: {
                    fontSize: "2rem",
                  },
                },
              },
            },
          ],
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          [theme.breakpoints.up("xs")]: {
            fontSize: ".7rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1.5rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "2rem",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "2rem",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: (props) => props.size === "large" && props.variant !== "large",
          style: {
            [theme.breakpoints.up("xs")]: {
              width: 800,
            },
            [theme.breakpoints.up("sm")]: {
              width: 800,
            },
            [theme.breakpoints.up("md")]: {
              width: 300,
            },
            [theme.breakpoints.up("lg")]: {
              width: 800,
            },
            [theme.breakpoints.up("xl")]: {
              width: 800,
            },
          },
        },
      ],
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
declare module "@mui/material/Typography" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

export default theme;
