// Main.js
import React, { useEffect, useState } from "react";
import "./Main.scss";
import moment from "moment";

const Main = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerVisible, setTimerVisible] = useState<boolean>(true);

  useEffect(() => {
    const targetDate = moment("2024-04-13T00:00:00");

    const updateTimer = () => {
      const now = moment();
      const duration = moment.duration(targetDate.diff(now));

      if (duration.asMilliseconds() > 0) {
        const totalHours = duration.asHours();
        setHours(Math.floor(totalHours));

        const remainingMinutes = duration.minutes();
        const remainingSeconds = duration.seconds();

        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);

        setTimerVisible(false);
        setTimeout(() => {
          setTimerVisible(true);
        }, 0);
      } else {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    updateTimer();

    const timerInterval = setInterval(() => {
      updateTimer();
    }, 100);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="main">
      <div className="text_appear">
        <div className="text-overlay">
          <div className="text">
            <p>NOTHING IS</p>
            <p>ETERNAL</p>
          </div>
          <div className="timer">
            <p
              className={`timer-animation ${
                timerVisible ? "timer-visible" : ""
              }`}
            >
              {`${hours}H:${String(minutes).padStart(2, "0")}M:${String(
                seconds
              ).padStart(2, "0")}S`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
