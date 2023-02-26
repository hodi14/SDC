import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

import { loginInputs, signupInputs, users } from "../../constants/login";

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

  const [loginTab, setLoginTab] = useState(0);
  const [loginInfo, setLoginInfo] = useState(loginInputs);
  const [signupInfo, setSignupInfo] = useState(signupInputs);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(true);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    setLoginError(null);

    if (Object.keys(loginInfo).some((key) => !loginInfo[key]?.value?.length))
      setLoginButtonDisabled(true);
    else setLoginButtonDisabled(false);
  }, [loginInfo]);

  useEffect(() => {
    if (Object.keys(signupInfo).some((key) => !signupInfo[key]?.value?.length))
      setSignupButtonDisabled(true);
    if (signupInfo?.password?.value?.length < 8) setSignupButtonDisabled(true);
    if (signupInfo?.password?.phone?.length < 10) setSignupButtonDisabled(true);
    if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        signupInfo?.password?.mail?.length
      )
    )
      setSignupButtonDisabled(true);
    else setLoginButtonDisabled(false);
  }, [signupButtonDisabled]);

  useEffect(() => {
    if (localStorage.getItem("user")) router.replace("/");
  }, []);

  return (
    <Box>
      <Card>
        <Tabs
          value={loginTab}
          onChange={(e, newValue) => setLoginTab(newValue)}
          textColor="inherit"
          aria-label="login tabs"
          sx={{
            "& .MuiButtonBase-root": {
              width: "50%",

              "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "0.5rem",
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

        <TabPanel value={loginTab} index={0}>
          <FormGroup>
            {Object.keys(loginInputs).map((key) => (
              <TextField
                variant="standard"
                key={key}
                label={loginInputs?.[key].id}
                placeholder={loginInputs?.[key]?.placeholder}
                type={loginInputs?.[key]?.type}
                value={loginInfo?.[key]?.value}
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
            color="secondary"
            sx={{
              display: "block",
              margin: "1rem auto 0.5rem",
            }}
            disabled={loginButtonDisabled}
            onClick={() => {
              const inputUser = JSON.stringify({
                user: loginInfo?.user?.value,
                password: loginInfo?.password?.value,
              });

              if (
                users.some((userData) => JSON.stringify(userData) === inputUser)
              ) {
                localStorage.setItem("user", inputUser);
                router.replace("/");
              } else setLoginError("User Not Found!!");
            }}
          >
            Login!
          </Button>
        </TabPanel>

        <TabPanel value={loginTab} index={1}>
          <FormGroup>
            {Object.keys(signupInputs).map((key) =>
              signupInputs?.[key].type !== "select" ? (
                <TextField
                  variant="standard"
                  key={key}
                  label={signupInputs?.[key].id}
                  placeholder={signupInputs?.[key]?.placeholder}
                  type={signupInputs?.[key]?.type}
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
                  fullWidth
                />
              ) : (
                <FormControl variant="standard">
                  <InputLabel>{signupInputs?.[key]?.placeholder}</InputLabel>
                  <Select
                    label={signupInputs?.[key].id}
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
            color="secondary"
            sx={{
              display: "block",
              margin: "1rem auto 0.5rem",
            }}
            disabled={signupButtonDisabled}
          >
            Sign Up!
          </Button>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default Login;
