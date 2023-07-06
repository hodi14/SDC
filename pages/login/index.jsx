import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { loginInputs, signupInputs } from "../../constants/login";
import { loadingContext } from "../../configs/context";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
};

const a11yProps = (index) => {
  return {
    id: `login-tab-${index}`,
    "aria-controls": `login-tabpanel-${index}`,
  };
};

const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  const { apiLoading, setApiLoading } = useContext(loadingContext);

  const [loginTab, setLoginTab] = useState(0);
  const [loginInfo, setLoginInfo] = useState(loginInputs);
  const [signupInfo, setSignupInfo] = useState(signupInputs);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const signupHandler = () => {
    setApiLoading(true);

    axios
      .post(
        "signup",
        JSON.stringify({
          phone_number: signupInfo?.phone?.value?.toString(),
          email: signupInfo?.email?.value,
          name: signupInfo?.name?.value,
          gender: signupInfo?.gender?.value,
          birth_year: signupInfo?.birthYear?.value?.toString(),
          password: signupInfo?.password?.value,
          study: signupInfo?.study?.value,
          dailect: signupInfo?.dialect?.value,
        })
      )
      .then((result) => {
        localStorage.setItem("userId", result?.data?.id);
        router.replace("/");

        alert("succesfuly signed up :)");
      })
      .catch(() => {
        setApiLoading(false);
        alert("something went wrong :(");
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const loginHandler = () => {
    setApiLoading(true);

    axios
      .post("login", {
        phone_number: loginInfo?.userId?.value,
        email: loginInfo?.userId?.value,
        password: loginInfo?.password?.value,
      })
      .then((result) => {
        if (result?.data?.login === "True") {
          localStorage.setItem("userId", loginInfo?.userId?.value);
          localStorage.setItem("userInfo", JSON.stringify(result?.data));

          router.replace("/");
          alert("welcome back :)");
        } else {
          alert("wrong info!");
        }
      })
      .catch(() => {
        setApiLoading(false);
        alert("something went wrong :(");
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  useEffect(() => {
    setLoginError(null);

    if (Object.keys(loginInfo).some((key) => !loginInfo[key]?.value?.length))
      setLoginButtonDisabled(true);
    else setLoginButtonDisabled(false);
  }, [loginInfo]);

  useEffect(() => {
    setSignupButtonDisabled(false);

    if (Object.keys(signupInfo).some((key) => !signupInfo[key]?.value?.length))
      setSignupButtonDisabled(true);
    if (signupInfo?.password?.value?.length < 8) setSignupButtonDisabled(true);
    if (
      signupInfo?.phone?.length < 10 ||
      (signupInfo?.phone?.length === 10 &&
        !signupInfo?.phone?.value.startsWidth("9")) ||
      (signupInfo?.phone?.length === 11 &&
        !signupInfo?.phone?.value.startsWidth("09"))
    )
      setSignupButtonDisabled(true);
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(signupInfo?.email?.value))
      setSignupButtonDisabled(true);
  }, [signupInfo]);

  useEffect(() => {
    if (localStorage.getItem("userId")) router.replace("/");
  }, []);

  return (
    <Card className="fullHeightContainer maxHeightContainer">
      <Tabs
        value={loginTab}
        onChange={(e, newValue) => setLoginTab(newValue)}
        textColor="inherit"
        aria-label="login tabs"
        sx={{
          "& .MuiButtonBase-root": {
            width: "50%",

            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              borderRadius: "1rem",
              color: "#fff",
            },
          },

          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab label="Login" {...a11yProps(0)} />
        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>

      <TabPanel
        className={`maxHeightContainer ${
          loginTab === 0 ? "fullHeightContainer" : ""
        }`}
        value={loginTab}
        index={0}
      >
        <FormGroup
          className={loginTab === 0 ? "maxHeightContainer" : ""}
          sx={{
            display: "block",
          }}
        >
          {Object.keys(loginInputs).map((key) => (
            <TextField
              variant="standard"
              key={key}
              label={loginInputs?.[key].id}
              placeholder={loginInputs?.[key]?.placeholder}
              type={loginInputs?.[key]?.type}
              value={loginInfo?.[key]?.value}
              inputProps={{
                maxLength: loginInfo?.[key]?.maxLength,
              }}
              onChange={(e) =>
                setLoginInfo({
                  ...loginInfo,
                  [key]: {
                    ...loginInfo[key],
                    value: e.target.value,
                  },
                })
              }
              fullWidth
            />
          ))}

          {loginError ? (
            <Typography sx={{ color: "#be6f6f", fontWeight: "bold" }}>
              {loginError}
            </Typography>
          ) : null}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            margin: "1rem auto 0.5rem",
          }}
          disabled={loginButtonDisabled}
          onClick={loginHandler}
        >
          Login!
        </Button>
      </TabPanel>

      <TabPanel
        className={`maxHeightContainer ${
          loginTab === 1 ? "fullHeightContainer" : ""
        }`}
        value={loginTab}
        index={1}
      >
        <FormGroup
          className={loginTab === 1 ? "maxHeightContainer" : ""}
          sx={{
            display: "block",
          }}
        >
          {Object.keys(signupInputs).map((key) =>
            signupInputs?.[key].type !== "select" ? (
              <TextField
                variant="standard"
                key={key}
                label={signupInputs?.[key].id}
                placeholder={signupInputs?.[key]?.placeholder}
                type={signupInputs?.[key]?.type}
                value={signupInfo?.[key]?.value}
                inputProps={{
                  maxLength: signupInputs?.[key]?.maxLength,
                }}
                onChange={(e) =>
                  setSignupInfo({
                    ...signupInfo,
                    [key]: {
                      ...signupInfo[key],
                      value: e.target.value,
                    },
                  })
                }
                fullWidth
              />
            ) : (
              <FormControl variant="standard" sx={{ display: "flex" }}>
                <InputLabel sx={{ paddingLeft: "0.5rem" }}>
                  {signupInputs?.[key]?.placeholder}
                </InputLabel>
                <Select
                  label={signupInputs?.[key].id}
                  value={signupInfo?.[key]?.value}
                  onChange={(e) =>
                    setSignupInfo({
                      ...signupInfo,
                      [key]: {
                        ...signupInfo[key],
                        value: e.target.value,
                      },
                    })
                  }
                >
                  {signupInputs?.[key].options.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          )}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            margin: "1rem auto 0.5rem",
          }}
          disabled={signupButtonDisabled}
          onClick={signupHandler}
        >
          Sign Up!
        </Button>
      </TabPanel>
    </Card>
  );
};

export default Login;
