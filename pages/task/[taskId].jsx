import { useEffect } from "react";
import { useRouter } from "next/router";

import { Typography } from "@mui/material";

import RecorderControls from "../../components/Recorder/Controls";
import useRecorder from "../../hooks/useRecorder";

const Task = ({ item }) => {
  const router = useRouter();

  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;

  useEffect(() => {
    if (!localStorage.getItem("user")) router.replace("/login");
  }, []);

  return (
    <>
      <Typography>{item?.task}</Typography>

      <RecorderControls
        recorderState={recorderState}
        handlers={handlers}
        audio={audio}
      />
    </>
  );
};

export async function getStaticPaths() {
  const paths = [];
  for (let i = 1; i < 12; i++) paths.push({ params: { taskId: i.toString() } });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: {
      item: {
        title: "task",
      },
    },
  };
}

export default Task;
