import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  List,
  Card,
  Tab,
  Tabs,
  useTheme,
  Grid,
  Button,
  ListItem,
  Dialog,
  Typography,
  TextField,
} from "@mui/material";

import ItemCard from "../ItemCard";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`panel-tabpanel-${index}`}
      aria-labelledby={`panel-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
};

const a11yProps = (index) => {
  return {
    id: `panel-tab-${index}`,
    "aria-controls": `panel-tabpanel-${index}`,
  };
};

const Panel = () => {
  const theme = useTheme();
  let router = useRouter();

  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const [showPanel, setShowPanel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) router.replace("/");
    else setShowPanel(true);
  }, []);

  return showPanel ? (
    <Box>
      <Card>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorcolor="primary"
          textColor="inherit"
          aria-label="panel tabs"
          sx={{
            "& .MuiButtonBase-root": {
              width: "50%",

              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                borderRadius: "1rem",
                color: "#fff",
              },
            },

            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Tasks" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <List
            sx={{
              maxHeight: "calc(100vh - 14rem)",
              overflow: "auto",
              width: "100%",
            }}
          >
            {[...new Array(50)].map((item, index) => (
              <ListItem
                key={index}
                sx={{ minWidth: "40rem", padding: "0 0 1rem" }}
              >
                <Grid
                  container
                  sx={{
                    borderRadius: "1rem",
                    padding: "0.5rem",
                    alignItems: "center",
                    boxShadow: "inset 0 0 10px -5px #30566d",
                    minWidth: "40rem",
                    width: "100%",
                  }}
                >
                  <Grid xs={1} item>
                    {index}
                  </Grid>

                  <Grid xs={3} item>
                    name
                  </Grid>

                  <Grid xs={5} item>
                    user@gmail.com
                  </Grid>

                  <Grid xs={3} item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedUser("id");
                        setUserDialogOpen(true);
                      }}
                    >
                      Tasks Detail
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <List
            sx={{
              maxHeight: "calc(100vh - 16rem)",
              overflow: "auto",
              width: "100%",
            }}
          >
            {[...new Array(50)].map((item, index) => (
              <ListItem
                key={index}
                sx={{ minWidth: "40rem", padding: "0 0 1rem" }}
              >
                <Grid
                  container
                  sx={{
                    borderRadius: "1rem",
                    padding: "0.5rem",
                    alignItems: "center",
                    boxShadow: "inset 0 0 10px -5px #30566d",
                    minWidth: "40rem",
                    width: "100%",
                  }}
                >
                  <Grid xs={3} item>
                    {index}
                  </Grid>

                  <Grid xs={4} item>
                    {index * 100} users taken
                  </Grid>

                  <Grid xs={5} item>
                    <Button varinat="contained" color="primary">
                      delete task
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "1rem auto 0" }}
            onClick={() => setUploadDialogOpen(true)}
          >
            Upload new task
          </Button>
        </TabPanel>
      </Card>

      <Dialog
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "576px",
            padding: "1rem",
            width: "100%",
          },
        }}
      >
        <Typography>
          Tasks done:
          <span>12</span>
        </Typography>

        <List
          sx={{
            maxHeight: "calc(100vh - 16rem)",
            overflow: "auto",
            width: "100%",
          }}
        >
          {[...Array(12)].map((item, index) => (
            <ListItem
              sx={{
                minWidth: "10rem",
                marginBottom: "1rem",
                padding: "0",
                width: "100%",
              }}
              key={index}
            >
              <ItemCard
                item={{
                  id: index,
                  title: `task ${index}`,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Dialog>

      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "576px",
            padding: "1rem",
            width: "100%",
          },
        }}
      >
        <TextField
          variant="standard"
          label="task title"
          placeholder="task title"
          type="text"
          fullWidth
        />

        <input type="upload" />
      </Dialog>
    </Box>
  ) : null;
};

export default Panel;
