import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";

const info = {
  name: {
    id: "name",
    placeholder: "your name...",
    type: "text",
    value: "alireza hodaee",
  },
  email: {
    id: "email",
    placeholder: "your email...",
    type: "email",
    value: "alirezahodaee14@gmail.com",
  },
  tel: {
    id: "phone",
    placeholder: "your phone...",
    type: "tel",
    value: "9197145374",
  },
  birthday: {
    id: "birth year",
    placeholder: "birth year",
    type: "tel",
    value: "",
  },
};

const UserInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState(info);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardContent>
        {Object.keys(info).map((key) => (
          <TextField
            variant="standard"
            key={key}
            label={info?.[key].id}
            placeholder={info?.[key]?.placeholder}
            type={info?.[key]?.type}
            value={userInfo?.[key]?.value}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                [key]: {
                  ...userInfo[key],
                  value: e.target.value,
                },
              })
            }
            disabled={!editMode}
            fullWidth
          />
        ))}
      </CardContent>

      <CardActions>
        <Grid container>
          <Grid item xs={6} sx={{ padding: "0 0.5rem" }}>
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
