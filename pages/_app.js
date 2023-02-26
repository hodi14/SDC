import { useEffect, useState } from "react";
import Head from "next/head";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../configs/theme";
import { adminUser } from "../constants/login";
import Header from "../components/Header";
import "../styles/globals.css";
import Panel from "../components/Panel";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(localStorage.getItem("user"));
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

      <Box sx={{ maxWidth: "48rem", margin: "0 auto", padding: "1rem" }}>
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
          <>
            <Header />

            {isAdmin ? <Panel /> : <Component {...pageProps} />}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
