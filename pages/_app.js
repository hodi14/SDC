import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import axios from "axios";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";

import { getDesignTokens } from "../configs/theme";
import { loadingContext } from "../configs/context";
import useFullHeight from "../hooks/useFullHeight";

import Panel from "../components/Panel";
import Header from "../components/Header";
import "../styles/globals.css";

axios.defaults.baseURL = "http://43.202.44.172:8000/";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const fullHeight = useFullHeight();
  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens({ fullHeight }),
      }),
    [fullHeight]
  );
  const value = useMemo(() => ({ apiLoading, setApiLoading }), [apiLoading]);

  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(localStorage.getItem("userId"));
      setIsAdmin(localStorage.getItem("userId") == "o9732813xdh81d");
    }, 2000);

    axios
      .get("/tasks")
      .then((result) => {
        console.log("tasks: ", result);
      })
      .catch(() => {
        alert("something went wrong :(");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <loadingContext.Provider value={value}>
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
          {apiLoading && (
            <Box className="apiLoading">
              <LoopSharpIcon />
            </Box>
          )}
          {loading ? (
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
            </Box>
          ) : (
            <Box className="fullHeightContainer">
              <Header />

              <Box className="maxHeightContainer">
                {isAdmin ? <Panel /> : <Component {...pageProps} />}
              </Box>
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </loadingContext.Provider>
  );
}

export default MyApp;
