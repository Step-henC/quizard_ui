import { useRef, useState, useEffect } from "react";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";

export default function TimerToast() {
  //not a toast anymore

  const [timer, setTimer] = useState(1500); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
  };

  return (
    <Stack
      style={{ width: "100%", paddingBottom: "20px" }}
      direction="horizontal"
      gap={3}
    >
      <Button
        onClick={toggleStart}
        variant="outline-dark"
        className="p-2 m-auto"
      >
        {dispSecondsAsMins(timer)}
      </Button>
    </Stack>
  );
}
