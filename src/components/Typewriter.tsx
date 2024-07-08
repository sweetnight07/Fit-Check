import React, { useState, useEffect } from "react";
import "../assets/styles/App.css";

// type check the parameters passed in the FC
interface TypewriterProps {
  text: string;
  speed?: number;
  pause?: number;
}

// this type writes the given text at a desired speed. The useEffect is that it relies on time from the pause and
// with that time it changes a state which then allows the type write to continue.
// useEffect for the action of writing and countdown and useState for the indication to start the side effect
const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  pause = 0,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        if (!isPaused) {
          // when it is not paused we began type writing
          setDisplayedText((prevText) => prevText + text[index]);
          setIndex((prevIndex) => prevIndex + 1);
        }
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed, isPaused]); // this effect is dependent on the continous dependicies

  // this is responsible changing the state which is based off the pause number.
  useEffect(() => {
    if (pause > 0) {
      setIsPaused(true);
      // another dependencies?
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
      }, pause);
      return () => clearTimeout(pauseTimer);
    }
  }, [pause]);

  return <div className="typewriter-text">{displayedText}</div>;
};

export default Typewriter;
