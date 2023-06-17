import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import axios from "axios";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../configs/theme";
import { adminUser } from "../constants/login";
import Panel from "../components/Panel";
import Header from "../components/Header";
import useFullHeight from "../hooks/useFullHeight";
import "../styles/globals.css";

axios.defaults.baseURL = "http://43.202.44.172:8000/";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const fullHeight = useFullHeight();

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens({ fullHeight }),
      }),
    [fullHeight]
  );

  useEffect(() => {
    setTimeout(() => {
      // setLoggedIn(localStorage.getItem("user"));
      setIsAdmin(localStorage.getItem("user") == JSON.stringify(adminUser));
      setLoading(false);
    }, 2000);
  }, []);

  return (
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
  );
}

export default MyApp;
