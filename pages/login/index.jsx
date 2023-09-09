import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

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
import { checkLoggedIn } from "../../utils/checkLoggedIn";
import login from "../../assets/images/login.svg";
import signup from "../../assets/images/signup.svg";

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
  const { setApiLoading } = useContext(loadingContext);

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
          phone_number: signupInfo?.phone_number?.value
            ?.toString()
            .startsWith("0")
            ? signupInfo?.phone_number?.value?.toString().substring(1)
            : signupInfo?.phone_number?.value?.toString(),
          email: signupInfo?.email?.value,
          name: signupInfo?.name?.value,
          gender: signupInfo?.gender?.value,
          birth_year: signupInfo?.birth_year?.value?.toString(),
          password: signupInfo?.password?.value,
          study: signupInfo?.study?.value,
          dialect: signupInfo?.dialect?.value,
        })
      )
      .then((result) => {
        localStorage.setItem(
          "userId",
          signupInfo?.phone_number?.value?.toString().startsWith("0")
            ? signupInfo?.phone_number?.value?.toString().substring(1)
            : signupInfo?.phone_number?.value?.toString()
        );
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            phone_number: signupInfo?.phone_number?.value
              ?.toString()
              .startsWith("0")
              ? signupInfo?.phone_number?.value?.toString().substring(1)
              : signupInfo?.phone_number?.value?.toString(),
            email: signupInfo?.email?.value,
            name: signupInfo?.name?.value,
            gender: signupInfo?.gender?.value,
            birth_year: signupInfo?.birth_year?.value?.toString(),
            password: signupInfo?.password?.value,
            study: signupInfo?.study?.value,
            dialect: signupInfo?.dialect?.value,
          })
        );
        router.replace("/");

        toast.success("succesfuly signed up :)");
      })
      .catch(() => {
        setApiLoading(false);
        toast.error("something went wrong");
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const loginHandler = () => {
    setApiLoading(true);

    axios
      .post("login", {
        phone_number: loginInfo?.userId?.value.toString().startsWith("0")
          ? loginInfo?.userId?.value?.toString().substring(1)
          : loginInfo?.userId?.value?.toString(),
        email: loginInfo?.userId?.value.toString().startsWith("0")
          ? loginInfo?.userId?.value?.toString().substring(1)
          : loginInfo?.userId?.value?.toString(),
        password: loginInfo?.password?.value,
      })
      .then((result) => {
        if (result?.data?.login === "True") {
          localStorage.setItem("userId", result?.data?.phone_number);
          localStorage.setItem("userInfo", JSON.stringify(result?.data));

          router.replace("/");
          toast.success("welcome back :)");
        } else {
          toast.error("wrong info!");
        }
      })
      .catch(() => {
        setApiLoading(false);
        toast.error("something went wrong");
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
      signupInfo?.phone_number?.length < 10 ||
      (signupInfo?.phone_number?.length === 10 &&
        !signupInfo?.phone_number?.value.startsWith("9")) ||
      (signupInfo?.phone_number?.length === 11 &&
        !signupInfo?.phone_number?.value.startsWith("09"))
    )
      setSignupButtonDisabled(true);
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(signupInfo?.email?.value))
      setSignupButtonDisabled(true);
  }, [signupInfo]);

  useEffect(() => {
    if (checkLoggedIn()) router.replace("/");
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
            flexDirection: "row",
            alignItems: "center",

            "@media(max-width: 576px)": {
              flexDirection: "column-reverse !important",

              "& img": { maxHeight: "15rem !important" },
            },
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
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
          </Box>

          <Image
            style={{
              maxWidth: "20rem",
              width: "100%",
            }}
            src={login}
            alt="login"
          />
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            margin: "1rem auto 0.5rem",
            minWidth: "15rem",
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
            flexDirection: "row",
            alignItems: "center",

            "@media(max-width: 576px)": {
              flexDirection: "column-reverse !important",

              "& img": { maxHeight: "15rem !important" },
            },
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
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
          </Box>

          <Image
            style={{
              maxWidth: "20rem",
              width: "100%",
            }}
            src={signup}
            alt="signup"
          />
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            margin: "1rem auto 0.5rem",
            minWidth: "15rem",
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
