import { Box, Button, Card, Grid, Typography, useTheme } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";

import RecordingsList from "../List";
import { formatMinutes, formatSeconds } from "../../../utils/formatTime";

const RecorderControls = ({ recorderState, handlers, audio }) => {
  const theme = useTheme();
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 8rem)",
      }}
    >
      <Card
        sx={{
          flexGrow: "1",
          overflow: "auto",
        }}
      >
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas
          accumsan lacus vel facilisis. Arcu odio ut sem nulla pharetra diam
          sit. Molestie at elementum eu facilisis. Ullamcorper sit amet risus
          nullam. Ipsum suspendisse ultrices gravida dictum fusce ut placerat
          orci. Pretium quam vulputate dignissim suspendisse. Arcu risus quis
          varius quam quisque id diam vel quam. Nulla malesuada pellentesque
          elit eget gravida. Eget mauris pharetra et ultrices neque ornare
          aenean euismod elementum. Et leo duis ut diam quam nulla porttitor.
          Adipiscing at in tellus integer.
        </Typography>
      </Card>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography
            sx={{
              backgroundColor: theme.palette.primary.main,
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
          <RecordingsList audio={audio} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecorderControls;
