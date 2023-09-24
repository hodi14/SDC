import { useEffect, useState } from "react";
import { htmlToText } from "html-to-text";
import { useRouter } from "next/router";
import Image from "next/image";

import { Grid, Typography } from "@mui/material";

import RecorderControls from "../../components/Recorder/Controls";
import useRecorder from "../../hooks/useRecorder";
import { checkLoggedIn } from "../../utils/checkLoggedIn";
import notFound from "../../assets/images/not-found.svg";

const Task = () => {
  const router = useRouter();
  const [task, setTask] = useState({});

  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;

  useEffect(() => {
    if (!checkLoggedIn()) router.replace("/login");
    else {
      const params = new URL(document.location).searchParams;
      const id = params.get("id");
      const tasks = JSON.parse(localStorage.getItem("tasks"));

      setTask(tasks?.[id] || false);
    }
  }, []);

  return task ? (
    <>
      {task.isHtml ? (
        htmlToText(task.text)
      ) : (
        <Typography>{task?.text}</Typography>
      )}

      <RecorderControls
        recorderState={recorderState}
        handlers={handlers}
        audio={audio}
      />
    </>
  ) : (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={notFound}
        alt="!"
        style={{ width: "100%", maxWidth: "20rem" }}
      />
      <Typography> I COULDN't FIND SUCH TASK :(</Typography>
    </Grid>
  );
};

export default Task;
