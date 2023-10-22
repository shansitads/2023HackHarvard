import React, { useState } from "react";
import "../App.css";

const smileyImages = [
  "./src/assets/smiley1.png",
  "./src/assets/smiley2.png",
  "./src/assets/smiley3.png",
  "./src/assets/smiley4.png",
  "./src/assets/smiley5.png"
];

const MoodTracker = () => {
  const [selectedSmiley, setSelectedSmiley] = useState(null);

  const handleSmileyClick = (smileyValue) => {
    setSelectedSmiley(smileyValue);
  };
  

  return (
    <div className="mood-tracker">
      <div className="container">
        <style>
          {`
            .custom-font {
              font-family: 'Poppins', sans-serif;
            }
          `}
        </style>
        <h1 className="custom-font">How are you feeling today?</h1>
        <div className="smiley-container">
          {[1, 2, 3, 4, 5].map((smileyValue, index) => (
            <img
              key={smileyValue}
              src={smileyImages[index]}
              alt={`Smiley ${smileyValue}`}
              className={`smiley ${selectedSmiley === smileyValue ? "selected" : ""}`}
              onClick={() => handleSmileyClick(smileyValue)}
            />
          ))}
        </div>
        
      </div>
     </div>
  );
};

export default MoodTracker;