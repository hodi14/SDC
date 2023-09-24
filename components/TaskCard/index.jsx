import { Card, Typography, Button } from "@mui/material";

import Link from "next/link";

const TaskCard = ({ item }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <Typography color="primary" sx={{ margin: "0.5rem 0 1rem" }}>
        {item.title}
      </Typography>

      <Button color="primary" variant="contained" fullWidth>
        <Link href={`/task/?id=${item.id}`}>View Task</Link>
      </Button>
    </Card>
  );
};

export default TaskCard;
