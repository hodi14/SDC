import { useEffect, useState, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import axios from "axios";

import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../configs/theme";
import { loadingContext } from "../configs/context";
import { setupInterceptorsTo } from "../configs/configAxios";
import useFullHeight from "../hooks/useFullHeight";

import Panel from "../components/Panel";
import Header from "../components/Header";
import { checkLoggedIn } from "../utils/checkLoggedIn";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  setupInterceptorsTo(axios);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const fullHeight = useFullHeight();
  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens({ fullHeight }),
      }),
    [fullHeight]
  );
  const value = useMemo(() => ({ apiLoading, setApiLoading }), [apiLoading]);

  const loadingHandler = async () => {
    if (!apiLoading) {
      setTimeout(() => {
        setShowLoading(false);
      }, 1_000);
    } else setShowLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(checkLoggedIn());
      setIsAdmin(localStorage.getItem("userId") == "o9732813xdh81d");
    }, 2000);
  }, []);

  useEffect(() => {
    loadingHandler();
  }, [apiLoading]);

  return (
    <loadingContext.Provider value={value}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={2}
      />
      <ThemeProvider theme={theme}>
        <Head>
          <title>Voice Recognition</title>
          <meta name="description" content="Voice Recognition App" />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box
          sx={{
            maxWidth: "48rem",
            margin: "0 auto",
            padding: "1rem",
            height: `calc(${fullHeight}px - env(safe-area-inset-bottom))`,
            overflow: "hidden",
          }}
        >
          {showLoading ? (
            <Box className="apiLoading">
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  maxWidth: "24rem",
                  transform: "translate(-50%, -50%)",
                  width: "calc(100% - 2rem)",

                  "& span": {
                    borderRadius: "0.5rem !important",
                    height: "1rem !important",
                  },
                }}
              >
                <LinearProgress />

                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem 0",
                  }}
                >
                  PLEASE WAIT...
                </Typography>
              </Box>
            </Box>
          ) : null}

          <Box
            className="fullHeightContainer"
            sx={{ pointerEvents: apiLoading ? "none" : "auto" }}
          >
            <Header />

            <Box className="maxHeightContainer">
              {isAdmin ? <Panel /> : <Component {...pageProps} />}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </loadingContext.Provider>
  );
}

export default MyApp;
