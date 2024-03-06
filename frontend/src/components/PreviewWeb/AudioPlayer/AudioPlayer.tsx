import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import "./AudioPlayer.scss";

// @ts-ignore
import onSound from "../../../assets/svg/onSound.svg";
// @ts-ignore
import offSound from "../../../assets/svg/offSound.svg";
// @ts-ignore
import intro from "../../../assets/wav/intro.wav";

// const onSound = require("../../../assets/svg/onSound.svg") as string;

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [intro],
      autoplay: true,
      loop: true,
    });

    setSound(newSound);

    return () => {
      newSound.stop();
    };
  }, []);

  useEffect(() => {
    if (sound) {
      isPlaying ? sound.play() : sound.pause();
    }
  }, [isPlaying, sound]);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="audio_player">
      <button onClick={togglePlay}>
        {isPlaying ? (
          <img src={onSound} alt="on" />
        ) : (
          <img src={offSound} alt="off" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
