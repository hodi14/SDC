import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90c7c9",
    },
    secondary: {
      main: "#457b9d",
    },
    background: {
      default: "#f1faee",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    "*": {
      color: "#fff",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#90c7c9",
          boxShadow: "0 0 10px -5px #457b9d",
          padding: "0.5rem",

          "*": {
            color: "#fff",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "0.5rem 0",

          "& *": {
            border: "none",
            color: "#1d3557 !important",
          },

          "& .MuiInputBase-root": {
            borderBottom: "2px solid #1d3557",
            borderRadius: "0",

            "&:after, &:before": {
              display: "none",
            },

            "& input": {
              padding: "0.5rem 0.5rem 0.25rem !important",

              "&.Mui-disabled": {
                opacity: "0.8",
                "-webkit-text-fill-color": "unset",
              },
            },
          },
        },
      },
    },
    MuiTabs: {
      root: {
        "& .MuiButton-root": {
          width: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none !important",
          transition: "0.4s",

          "&:hover": {
            transform: "scale(1.025)",
            transition: "0.4s",
          },
        },
      },
    },
  },
});

export default theme;
