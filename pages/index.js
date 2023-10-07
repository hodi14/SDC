import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";

import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { loadingContext } from "../configs/context";
import TaskCard from "../components/TaskCard";
import UserInfo from "../components/UserInfo";
import { checkLoggedIn } from "../utils/checkLoggedIn";
import empty from "../assets/images/empty.svg";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { apiLoading, setApiLoading } = useContext(loadingContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (!checkLoggedIn()) router.replace("/login");
    else {
      setIsLoggedIn(true);
      setApiLoading(true);
      axios
        .get(`/tasks/${localStorage.getItem("userId")}`)
        .then((result) => {
          setUserTasks(result);
          localStorage.setItem("tasks", JSON.stringify(result));
        })
        .catch(() => {
          toast.error("something went wrong");
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
          {!apiLoading && userTasks?.length ? (
            <Typography color="primary" variant="h6">
              Already Completed
            </Typography>
          ) : null}

          <CardContent
            sx={{
              overflow: "auto",
              flexGrow: "1",
              padding: "0.5rem",
            }}
          >
            {!apiLoading && userTasks?.length ? (
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
              <>
                <Typography color="primary" variant="h6">
                  You're New !!
                </Typography>

                <Image
                  style={{
                    height: "calc(100% - 3rem)",
                    width: "100%",
                  }}
                  src={empty}
                  alt="empty"
                />
              </>
            )}
          </CardContent>

          <CardActions sx={{ padding: "0" }}>
            <Button variant="contained" color="primary" fullWidth>
              <Link href="/task?id=0">
                {!apiLoading && userTasks?.length
                  ? "Continue to next task"
                  : "Go to first task"}
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  ) : null;
}
