import { Card, Typography, Button } from "@mui/material";
import Link from "next/link";

const ItemCard = ({ item }) => {
  return (
    <Card>
      <Typography color="primary" sx={{ margin: "0.5rem 0 1rem" }}>
        {item.title}
      </Typography>

      <Button color="primary" variant="contained" fullWidth>
        <Link href={`/item/${item.id}`}>view Item</Link>
      </Button>
    </Card>
  );
};

export default ItemCard;
