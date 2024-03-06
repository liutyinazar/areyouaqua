import "./Main.scss";
import moment from "moment";
import React, { useEffect, useState } from "react";
// @ts-ignore
import soonVideo from "../../../assets/mp4/soon.mp4";

import AudioPlayer from "../AudioPlayer/AudioPlayer";

import Code from "../Code/Code";

const Main = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timerVisible, setTimerVisible] = useState(true);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [displayedLetters, setDisplayedLetters] = useState("");

  useEffect(() => {
    const targetDate = moment("2024-04-13T00:00:00");

    const updateTimer = () => {
      const now = moment();
      const duration = moment.duration(targetDate.diff(now));

      if (duration.asMilliseconds() > 0) {
        const totalDays = Math.floor(duration.asDays());
        const remainingHours = duration.hours();
        const remainingMinutes = duration.minutes();
        const remainingSeconds = duration.seconds();

        setTimeRemaining({
          days: totalDays,
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        });

        setTimerVisible(false);
        setTimeout(() => {
          setTimerVisible(true);
        }, 0);

        // Check if it's the last 24 hours before the timer ends
        if (totalDays === 0 && remainingHours <= 24) {
          const word = "ANTIDOTE";
          const hoursPassed = 24 - remainingHours;

          // Display one random letter every 3 hours
          const letterIndexToShow = Math.floor(hoursPassed / 3);

          // Check if enough time has passed to show a new letter
          if (letterIndexToShow < word.length) {
            setDisplayedLetters(word.substring(0, letterIndexToShow + 1));
          } else {
            // Display the entire word if all letters are already shown
            setDisplayedLetters(word);
          }
        } else {
          // Display the entire word if the timer is not in the last 24 hours
          setDisplayedLetters("");
        }
      } else {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        setTimerCompleted(true);
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
    <div className={`main ${timerCompleted ? "video-background" : ""}`}>
      <Code />
      <AudioPlayer />
      <div className="text_appear">
        <div className="text-overlay">
          <div className={`text ${timerCompleted ? "fade-out" : "fade-in"}`}>
            <p>
              {timerCompleted
                ? "ANTIDOTE"
                : displayedLetters
                ? "the time has come"
                : "the time has come"}
            </p>
          </div>

          {timerCompleted ? (
            <div
              className={`video-container ${
                timerVisible ? "fade-in" : "fade-out"
              }`}
            >
              <video src={soonVideo} controls autoPlay loop muted />
            </div>
          ) : (
            <div className={`timer ${timerVisible ? "fade-in" : "fade-out"}`}>
              <p
                className={`timer-animation ${
                  timerVisible ? "timer-visible" : ""
                }`}
              >
                {`${timeRemaining.days}D:${timeRemaining.hours}H:${String(
                  timeRemaining.minutes
                ).padStart(2, "0")}M:${String(timeRemaining.seconds).padStart(
                  2,
                  "0"
                )}S`}
              </p>
            </div>
          )}
          {!timerCompleted && (
            <div
              className={`random-text-wrapper ${
                timerVisible ? "fade-in" : "fade-out"
              }`}
            >
              {displayedLetters.split("").map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
