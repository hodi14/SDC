import { useEffect } from "react";
import { useRouter } from "next/router";

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

import ItemCard from "../components/ItemCard";
import UserInfo from "../components/UserInfo";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) router.replace("/login");
  }, []);

  return localStorage.getItem("user") ? (
    <Grid container spacing="1rem" alignItems="stretch">
      <Grid item xs={12} sm={6}>
        <UserInfo />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card sx={{ height: "100%", width: "100%" }}>
          <Typography color="primary" variant="h6">
            Already Completed
          </Typography>

          <CardContent
            sx={{
              overflow: "auto",
              maxHeight: "calc(min(30rem, calc(100vh - 8rem)))",
              padding: "0.5rem",
            }}
          >
            {[...Array(5)].map((item, index) => (
              <Box
                sx={{
                  width: "100%",
                  minWidth: "10rem",
                  marginBottom: "1rem",
                }}
                key={index}
              >
                <ItemCard
                  item={{
                    id: index,
                    title: `task ${index}`,
                  }}
                />
              </Box>
            ))}
          </CardContent>

          <CardActions sx={{ padding: "1rem" }}>
            <Button variant="contained" color="primary" fullWidth>
              Continue to next task
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  ) : null;
}
