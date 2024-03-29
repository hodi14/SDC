import { useContext } from "react";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";

import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import useRecordingsList from "../../../hooks/useRecordingsList";
import { loadingContext } from "../../../configs/context";

const RecordingsList = ({ audio, task, userInfo }) => {
  const theme = useTheme();
  const { recordings, deleteAudio } = useRecordingsList(audio);
  const formData = new FormData();

  const { setApiLoading } = useContext(loadingContext);

  return (
    recordings.length > 0 && (
      <>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: "0.5rem" }}
        >
          <audio
            controls
            src={recordings[recordings.length - 1]?.audio}
            style={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: "0.5rem",
              height: "2.5rem",
              width: "calc(100% - 7rem)",
              maxWidth: "20rem",
            }}
          />

          <Button
            variant="contained"
            onClick={() => {
              recordings.map((record) => deleteAudio(record.key));
            }}
            sx={{ marginLeft: "0.5rem", width: "6.5rem" }}
          >
            Delete
            <DeleteIcon />
          </Button>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: "0.5rem" }}
        >
          <FormControl
            variant="standard"
            style={{
              width: "calc(100% - 7rem)",
              maxWidth: "20rem",
            }}
          >
            <InputLabel>current noise level</InputLabel>
            <Select label="noise level">
              <MenuItem value={0}>low</MenuItem>
              <MenuItem value={1}>medium</MenuItem>
              <MenuItem value={2}>high</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ width: "6.5rem" }}
            onClick={() => {
              setApiLoading(true);

              formData.append("user_email", userInfo?.email?.value);
              formData.append("user_phone", userInfo?.phone_number?.value);
              formData.append("task_text", task?.text);
              formData.append("task_id", task?.id);
              formData.append("uploaded_file", audio);

              axios
                .post("upload-file", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then(() => {
                  toast.error("file successfully uploaded");
                })
                .catch(() => {
                  toast.error("something went wrong");
                })
                .finally(() => {
                  setApiLoading(false);
                });
            }}
          >
            Submit
          </Button>
        </Grid>
      </>
    )
  );
};

export default RecordingsList;
