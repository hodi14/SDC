import { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { signupInputs } from "../../constants/login";

const UserInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInputs, setUserInputs] = useState(signupInputs);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      Object.keys(JSON.parse(localStorage.getItem("userInfo"))).map((key) => {
        setUserInputs((prevState) => ({
          ...prevState,
          [key]: {
            ...userInputs[key],
            value: JSON.parse(localStorage.getItem("userInfo"))[key],
          },
        }));
      });
    }
  }, []);

  return (
    <Card className="fullHeightContainer">
      <CardContent className="maxHeightContainer">
        {Object.keys(userInputs).map((key) =>
          userInputs?.[key].type !== "select" ? (
            <TextField
              variant="standard"
              key={key}
              label={userInputs?.[key].id}
              placeholder={userInputs?.[key]?.placeholder}
              type={userInputs?.[key]?.type}
              value={userInputs?.[key]?.value}
              inputProps={{
                maxLength: signupInputs?.[key]?.maxLength,
              }}
              onChange={(e) =>
                setUserInputs({
                  ...userInputs,
                  [key]: {
                    ...userInputs[key],
                    value: e.target.value,
                  },
                })
              }
              disabled={!editMode}
              fullWidth
            />
          ) : (
            <FormControl variant="standard" fullWidth>
              <InputLabel sx={{ paddingLeft: "0.5rem" }}>
                {userInputs?.[key]?.value || userInputs?.[key]?.placeholder}
              </InputLabel>
              <Select
                value={userInputs?.[key]?.value}
                label={userInputs?.[key].id}
                fullWidth
                disabled={!editMode}
                onChange={(e) =>
                  setUserInputs({
                    ...userInputs,
                    [key]: {
                      ...userInputs[key],
                      value: e.target.value,
                    },
                  })
                }
              >
                {userInputs?.[key].options.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        )}
      </CardContent>

      <CardActions>
        <Grid container>
          <Grid item xs={editMode ? 6 : 12} sx={{ padding: "0 0.5rem" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setEditMode(!editMode)}
              fullWidth
            >
              {editMode ? "Save" : "Edit"}
            </Button>
          </Grid>

          <Grid item xs={6} sx={{ padding: "0 0.5rem" }}>
            {editMode && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setUserInfo(info);
                  setEditMode(false);
                }}
                fullWidth
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UserInfo;
