import { useEffect, useState } from "react";
import { htmlToText } from "html-to-text";

import { Box, Button, Card, Grid, Typography, useTheme } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";

import RecordingsList from "../List";
import { formatMinutes, formatSeconds } from "../../../utils/formatTime";
import { signupInputs } from "../../../constants/login";

const RecorderControls = ({ task, recorderState, handlers, audio }) => {
  const theme = useTheme();
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  const [userInputs, setUserInputs] = useState(signupInputs);

  useEffect(() => {
    Object.keys(JSON.parse(localStorage.getItem("userInfo"))).map((key) => {
      setUserInputs((prevState) => ({
        ...prevState,
        [key]: {
          ...userInputs[key],
          value: JSON.parse(localStorage.getItem("userInfo"))[key],
        },
      }));
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 8rem)",
        fontFamily: "system-ui",
      }}
    >
      <Card
        sx={{
          flexGrow: "1",
          overflow: "auto",
          direction: "rtl",
        }}
      >
        {task.isHtml ? (
          htmlToText(task.text)
        ) : (
          <Typography>{task?.text}</Typography>
        )}
      </Card>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              borderRadius: "0.5rem",
              fontWeight: "bold",
              margin: "0.5rem",
              padding: "0.375rem 0.5rem 0.375rem 1rem",
              letterSpacing: "0.25rem",
              width: "fit-content",
            }}
          >
            {`${formatMinutes(recordingMinutes)} : ${formatSeconds(
              recordingSeconds
            )}`}
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{ flexGrow: "1" }}>
          <Grid
            container
            alignItems="center"
            sx={{ flexDirection: "row-reverse" }}
          >
            {initRecording ? (
              <>
                <Button
                  sx={{ margin: "1rem 0.5rem" }}
                  variant="contained"
                  onClick={cancelRecording}
                >
                  Cancel
                  <CloseIcon />
                </Button>

                <Button
                  sx={{ margin: "1rem 0.5rem" }}
                  variant="contained"
                  disabled={recordingSeconds === 0}
                  onClick={saveRecording}
                >
                  Stop
                  <StopIcon />
                </Button>
              </>
            ) : (
              <Button
                sx={{ margin: "1rem 0.5rem" }}
                variant="contained"
                onClick={startRecording}
              >
                Start
                <KeyboardVoiceIcon />
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            "audio::-webkit-media-controls-play-button, audio::-webkit-media-controls-panel":
              {
                backgroundColor: theme.palette.primary.main,
                color: "#000",
              },
          }}
        >
          <RecordingsList audio={audio} task={task} userInputs={userInputs} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecorderControls;
