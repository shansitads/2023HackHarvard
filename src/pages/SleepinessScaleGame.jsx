import React, { useState } from "react";
import { setDoc } from "firebase/firestore";
import "../App.css";

const sleepyImages = [
  "./src/assets/sleepy1.png",
  "./src/assets/sleepy2.png",
  "./src/assets/sleepy3.png",
  "./src/assets/sleepy4.png",
  "./src/assets/sleepy5.png",
];

const SleepinessScale = ({ dataRef, toggleSleepy }) => {
  const [selectedSleepy, setSelectedSleepy] = useState(null);

  const handleSleepyClick = (sleepyValue) => {
    setSelectedSleepy(sleepyValue);
    const calcSleep = (sleepyValue - 1) / 4;
    setDoc(dataRef.current, { Sleep: calcSleep }, { merge: true });
    toggleSleepy();
  };

  return (
    <div className="sleep-tracker">
      <div className="container">
        <style>
          {`
.custom-font {
font-family: 'Poppins', sans-serif;
}
`}
        </style>
        <h1 className="custom-font">What has your energy been like?</h1>
        <div className="sleepy-container">
          {[1, 2, 3, 4, 5].map((sleepyValue, index) => (
            <img
              key={sleepyValue}
              src={sleepyImages[index]}
              alt={`Sleepy ${sleepyValue}`}
              className={`sleepy ${
                selectedSleepy === sleepyValue ? "selected" : ""
              }`}
              onClick={() => handleSleepyClick(sleepyValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SleepinessScale;
