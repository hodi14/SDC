import { useEffect, useState } from "react";
import Link from "next/link";

import { Button, Card, Grid, Typography } from "@mui/material";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage?.getItem("userId")) setIsLoggedIn(true);
  }, []);

  return (
    <Card
      sx={{
        margin: " 0 0 1rem",
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: "bold" }}>
          <Link href="/">Voice Recognition</Link>
        </Typography>

        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            localStorage?.getItem("userId") &&
              localStorage?.removeItem("userId");
            window.location.reload();
          }}
        >
          {isLoggedIn ? "Logout" : <Link href="/login">Login</Link>}
        </Button>
      </Grid>
    </Card>
  );
};

export default Header;
