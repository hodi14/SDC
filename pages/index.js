import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Box,
  Button,
  useTheme,
} from "@mui/material";

import { loadingContext } from "../configs/context";
import TaskCard from "../components/TaskCard";
import UserInfo from "../components/UserInfo";

export default function Home() {
  const router = useRouter();
  const { apiLoading, setApiLoading } = useContext(loadingContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) router.replace("/login");
    else {
      setIsLoggedIn(true);
      setApiLoading(true);
      axios
        .get(`/tasks_list/${localStorage.getItem("userId")}`)
        .then((result) => {
          setUserTasks(result?.data);
        })
        .catch(() => {
          // toast.error('something went wrong');
        })
        .finally(() => {
          setApiLoading(false);
        });
    }
  }, []);

  return isLoggedIn ? (
    <Grid
      container
      spacing="1rem"
      alignItems="stretch"
      sx={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: "100%",
          padding: "0",
          "@media(max-width: 600px)": {
            maxHeight: "50%",
          },
        }}
      >
        <UserInfo />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: "100%",
          "@media(max-width: 600px)": {
            maxHeight: "50%",
          },
        }}
      >
        <Card
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography color="primary" variant="h6">
            Already Completed
          </Typography>

          <CardContent
            sx={{
              overflow: "auto",
              flexGrow: "1",
              padding: "0.5rem",
            }}
          >
            {userTasks?.length ? (
              userTasks?.map((item, index) => (
                <Box
                  sx={{
                    width: "100%",
                    minWidth: "10rem",
                    marginBottom: "1rem",
                  }}
                  key={index}
                >
                  <TaskCard
                    item={{
                      id: index,
                      title: `task ${index}`,
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography color="primary" variant="h6">
                You're New !!
              </Typography>
            )}
          </CardContent>

          <CardActions sx={{ padding: "0" }}>
            <Button variant="contained" color="primary" fullWidth>
              Continue to next task
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  ) : null;
}
