import React, { useEffect, useState } from "react";
import "./Code.scss";

const wordsList = ["aqua", "hood", "legend", "okay", "skrttt"];

const getRandomPosition = () => {
  const maxX = window.innerWidth;
  const maxY = window.innerHeight - 50;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  return { left: randomX, top: randomY };
};

const Code = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const word = getRandomWord();
      setCurrentWord(word);

      setPosition(getRandomPosition());
      setVisible(true); // Показуємо слово перед початком анімації

      setTimeout(() => {
        setVisible(false);
      }, 500); // Збільшено інтервал для кращої продуктивності
    }, 2500); // Збільшено інтервал для кращої продуктивності

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="code">
      <div
        className={`random-word ${visible ? "fade-in" : "fade-out"}`}
        style={{ left: `${position.left}px`, top: `${position.top}px` }}
      >
        <p>{currentWord}</p>
      </div>
    </div>
  );
};

export default Code;
