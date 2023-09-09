import { useEffect, useState } from "react";
import Link from "next/link";

import { Button, Card, Grid, Typography } from "@mui/material";

import { checkLoggedIn } from "../../utils/checkLoggedIn";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkLoggedIn()) setIsLoggedIn(true);
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
            checkLoggedIn() && localStorage?.removeItem("userId");
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
