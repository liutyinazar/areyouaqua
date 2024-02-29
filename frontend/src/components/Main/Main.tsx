import React, { useEffect } from "react";
import "./Main.scss";
// @ts-ignore
import soonVideo from "../../assets/mp4/soon.mp4";

const Main = () => {
  useEffect(() => {
    const video = document.querySelector("video");

    if (video) {
      video.controls = false; // вимкнути кнопки
      video.play(); // автоматичне відтворення
    }
  }, []);

  return (
    <div className="main">
      {/* <div className="container"> */}
      {/* <iframe

          src="https://www.youtube.com/embed/CHp9rL8Y6yQ?si=pk2kcZ2KatWqvLRO"
          title="YouTube video player"
          allow="autoplay"
        ></iframe> */}
      {/* </div> */}
      <video controls autoPlay>
        <source src={soonVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Main;
