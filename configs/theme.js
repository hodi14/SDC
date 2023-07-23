export const getDesignTokens = ({ fullHeight }) => ({
  fullHeight: `calc(${fullHeight}px - env(safe-area-inset-bottom))`,

  palette: {
    primary: {
      main: "#30566d",
    },
    secondary: {
      main: "#30566d",
    },
    background: {
      default: "#D6E4E5",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    "*": {
      color: "#30566d",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          backgroundColor: "#D6E4E5",
          boxShadow: "inset 0 0 10px -5px #30566d",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#D6E4E5",
          boxShadow: "inset 0 0 10px -5px #30566d",
          borderRadius: "1rem",
          padding: "1rem",

          "*": {
            color: "#30566d",
          },

          "& .MuiButton-containedPrimary": {
            color: "#fff",
            "& *": {
              color: "#fff",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-root:before, &.MuiInputBase-root:after": {
            display: "none",
          },

          "& .MuiSelect-select": {
            height: "2rem !important",
            boxShadow: "inset 0 0 10px -5px #30566d",
            borderRadius: "1rem",
            padding: "0.25rem 0.5rem",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        autoComplete: "new-password",
        form: {
          autoComplete: "off",
        },
      },

      styleOverrides: {
        root: {
          margin: "0.5rem 0",

          "& *": {
            border: "none",
            color: "#30566d !important",
          },

          "& .MuiInputBase-root": {
            boxShadow: "inset 0 0 10px -5px #30566d",
            borderRadius: "1rem",

            "&:after, &:before": {
              display: "none",
            },

            "& input": {
              padding: "0.5rem !important",

              "&.Mui-disabled": {
                opacity: "0.8",
                WebkitTextFillColor: "unset",
              },
            },
          },

          "& .MuiInputLabel-root": {
            padding: "0 0.5rem",
          },
        },
      },
    },
    MuiTabs: {
      root: {
        "& .MuiButton-root": {
          width: "100%",
          borderRadius: "1rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          boxShadow: "none",
          transition: "0.4s",

          "&:hover": {
            boxShadow: "0 0 10px -5px #30566d",
            transition: "0.4s",
          },
        },
      },
    },
  },
});
